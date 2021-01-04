import ParseResults from "./ParseResults";
import CommandContextBuilder from "./context/CommandContextBuilder";
import CommandSyntaxException from "./exceptions/CommandSyntaxException";
import Suggestions from "./suggestion/Suggestions";
import SuggestionsBuilder from "./suggestion/SuggestionsBuilder";
import RootCommandNode from "./tree/RootCommandNode";
import StringReader from "./StringReader";
const ARGUMENT_SEPARATOR = " ";
const USAGE_OPTIONAL_OPEN = "[";
const USAGE_OPTIONAL_CLOSE = "]";
const USAGE_REQUIRED_OPEN = "(";
const USAGE_REQUIRED_CLOSE = ")";
const USAGE_OR = "|";
export default class CommandDispatcher {
    constructor(root = null) {
        this.consumer = {
            onCommandComplete() { }
        };
        this.root = root || new RootCommandNode();
    }
    register(command) {
        let build = command.build();
        this.root.addChild(build);
        return build;
    }
    setConsumer(consumer) {
        this.consumer = consumer;
    }
    execute(input, source = null) {
        if (typeof input === "string")
            input = new StringReader(input);
        let parse;
        if (input instanceof StringReader) {
            if (!(source == null))
                parse = this.parse(input, source);
        }
        else
            parse = input;
        if (parse.getReader().canRead()) {
            if (parse.getExceptions().size === 1) {
                throw parse.getExceptions().values().next().value;
            }
            else if (parse.getContext().getRange().isEmpty()) {
                throw CommandSyntaxException.BUILT_IN_EXCEPTIONS.dispatcherUnknownCommand().createWithContext(parse.getReader());
            }
            else {
                throw CommandSyntaxException.BUILT_IN_EXCEPTIONS.dispatcherUnknownArgument().createWithContext(parse.getReader());
            }
        }
        let result = [];
        let successfulForks = 0;
        let forked = false;
        let foundCommand = false;
        let command = parse.getReader().getString();
        let original = parse.getContext().build(command);
        let contexts = [];
        contexts.push(original);
        let next = null;
        while (!(contexts == null)) {
            for (let i = 0; i < contexts.length; i++) {
                let context = contexts[i];
                let child = context.getChild();
                if (!(child == null)) {
                    forked = forked || context.isForked();
                    if (child.hasNodes()) {
                        foundCommand = true;
                        let modifier = context.getRedirectModifier();
                        if (modifier == null) {
                            if (next == null)
                                next = [];
                            next.push(child.copyFor(context.getSource()));
                        }
                        else {
                            try {
                                let results = modifier.apply(context);
                                if (results.length !== 0) {
                                    if (next == null)
                                        next = [];
                                    for (let source of results) {
                                        next.push(child.copyFor(source));
                                    }
                                }
                            }
                            catch (ex) {
                                this.consumer.onCommandComplete(context, false, 0);
                                if (!forked)
                                    throw ex;
                            }
                        }
                    }
                }
                else if (context.getCommand() != null) {
                    foundCommand = true;
                    try {
                        let value = context.getCommand()(context);
                        result.push(value);
                        this.consumer.onCommandComplete(context, true, value);
                        successfulForks++;
                    }
                    catch (ex) {
                        this.consumer.onCommandComplete(context, false, 0);
                        if (!forked)
                            throw ex;
                    }
                }
            }
            contexts = next;
            next = null;
        }
        if (!foundCommand) {
            this.consumer.onCommandComplete(original, false, 0);
            throw CommandSyntaxException.BUILT_IN_EXCEPTIONS.dispatcherUnknownCommand().createWithContext(parse.getReader());
        }
        return result;
    }
    parse(command, source) {
        if (typeof command === "string")
            command = new StringReader(command);
        let context = new CommandContextBuilder(this, source, this.root, command.getCursor());
        return this.parseNodes(this.root, command, context);
    }
    parseNodes(node, originalReader, contextSoFar) {
        let source = contextSoFar.getSource();
        let errors = null;
        let potentials = null;
        let cursor = originalReader.getCursor();
        for (let child of node.getRelevantNodes(originalReader)) {
            if (!child.canUse(source))
                continue;
            let context = contextSoFar.copy();
            let reader = new StringReader(originalReader);
            try {
                child.parse(reader, context);
                if (reader.canRead())
                    if (reader.peek() != ARGUMENT_SEPARATOR)
                        throw CommandSyntaxException.BUILT_IN_EXCEPTIONS.dispatcherExpectedArgumentSeparator().createWithContext(reader);
            }
            catch (ex) {
                if (errors == null) {
                    errors = new Map();
                }
                errors.set(child, ex);
                reader.setCursor(cursor);
                continue;
            }
            context.withCommand(child.getCommand());
            if (reader.canRead(child.getRedirect() == null ? 2 : 1)) {
                reader.skip();
                if (!(child.getRedirect() == null)) {
                    let childContext = new CommandContextBuilder(this, source, child.getRedirect(), reader.getCursor());
                    let parse = this.parseNodes(child.getRedirect(), reader, childContext);
                    context.withChild(parse.getContext());
                    return new ParseResults(context, parse.getReader(), parse.getExceptions());
                }
                else {
                    let parse = this.parseNodes(child, reader, context);
                    if (potentials == null) {
                        potentials = [];
                    }
                    potentials.push(parse);
                }
            }
            else {
                if (potentials == null) {
                    potentials = [];
                }
                potentials.push(new ParseResults(context, reader, new Map()));
            }
        }
        if (!(potentials == null)) {
            if (potentials.length > 1) {
                potentials.sort((a, b) => {
                    if (!a.getReader().canRead() && b.getReader().canRead()) {
                        return -1;
                    }
                    if (a.getReader().canRead() && !b.getReader().canRead()) {
                        return 1;
                    }
                    if (a.getExceptions().size === 0 && b.getExceptions().size !== 0) {
                        return -1;
                    }
                    if (a.getExceptions().size !== 0 && b.getExceptions().size === 0) {
                        return 1;
                    }
                    return 0;
                });
            }
            return potentials[0];
        }
        return new ParseResults(contextSoFar, originalReader, errors == null ? new Map() : errors);
    }
    getAllUsage(node, source, restricted) {
        const result = [];
        this.__getAllUsage(node, source, result, "", restricted);
        return result;
    }
    __getAllUsage(node, source, result, prefix = "", restricted) {
        if (restricted && !node.canUse(source)) {
            return;
        }
        if (node.getCommand() != null) {
            result.push(prefix);
        }
        if (node.getRedirect() != null) {
            const redirect = node.getRedirect() === this.root ? "..." : "-> " + node.getRedirect().getUsageText();
            result.push(prefix.length === 0 ? node.getUsageText() + ARGUMENT_SEPARATOR + redirect : prefix + ARGUMENT_SEPARATOR + redirect);
        }
        else if (node.getChildrenCount() > 0) {
            for (let child of node.getChildren()) {
                this.__getAllUsage(child, source, result, prefix.length === 0 ? child.getUsageText() : prefix + ARGUMENT_SEPARATOR + child.getUsageText(), restricted);
            }
        }
    }
    getSmartUsage(node, source) {
        let result = new Map();
        let optional = node.getCommand() !== null;
        for (let child of node.getChildren()) {
            let usage = this.__getSmartUsage(child, source, optional, false);
            if (!(usage == null)) {
                result.set(child, usage);
            }
        }
        return result;
    }
    __getSmartUsage(node, source, optional, deep) {
        if (!node.canUse(source)) {
            return null;
        }
        let self = optional ? USAGE_OPTIONAL_OPEN + node.getUsageText() + USAGE_OPTIONAL_CLOSE : node.getUsageText();
        let childOptional = node.getCommand() != null;
        let open = childOptional ? USAGE_OPTIONAL_OPEN : USAGE_REQUIRED_OPEN;
        let close = childOptional ? USAGE_OPTIONAL_CLOSE : USAGE_REQUIRED_CLOSE;
        if (!deep) {
            if ((node.getRedirect() != null)) {
                let redirect = node.getRedirect() == this.root ? "..." : "-> " + node.getRedirect().getUsageText();
                return self + ARGUMENT_SEPARATOR + redirect;
            }
            else {
                let children = [...node.getChildren()].filter(c => c.canUse(source));
                if ((children.length == 1)) {
                    let usage = this.__getSmartUsage(children[0], source, childOptional, childOptional);
                    if (!(usage == null)) {
                        return self + ARGUMENT_SEPARATOR + usage;
                    }
                }
                else if (children.length > 1) {
                    let childUsage = new Set();
                    for (let child of children) {
                        let usage = this.__getSmartUsage(child, source, childOptional, true);
                        if (!(usage == null)) {
                            childUsage.add(usage);
                        }
                    }
                    if (childUsage.size === 1) {
                        let usage = childUsage.values().next().value;
                        return self + ARGUMENT_SEPARATOR + (childOptional ? USAGE_OPTIONAL_OPEN + usage + USAGE_OPTIONAL_CLOSE : usage);
                    }
                    else if (childUsage.size > 1) {
                        let builder = open;
                        let count = 0;
                        for (let child of children) {
                            if (count > 0) {
                                builder += USAGE_OR;
                            }
                            builder += child.getUsageText();
                            count++;
                        }
                        if (count > 0) {
                            builder += close;
                            return self + ARGUMENT_SEPARATOR + builder;
                        }
                    }
                }
            }
        }
        return self;
    }
    async getCompletionSuggestions(parse, cursor = parse.getReader().getTotalLength()) {
        let context = parse.getContext();
        let nodeBeforeCursor = context.findSuggestionContext(cursor);
        let parent = nodeBeforeCursor.parent;
        let start = Math.min(nodeBeforeCursor.startPos, cursor);
        let fullInput = parse.getReader().getString();
        let truncatedInput = fullInput.substring(0, cursor);
        let futures = [];
        for (let node of parent.getChildren()) {
            let future = await Suggestions.empty();
            try {
                future = await node.listSuggestions(context.build(truncatedInput), new SuggestionsBuilder(truncatedInput, start));
            }
            catch (ignored) {
            }
            futures.push(future);
        }
        return Promise.resolve(Suggestions.merge(fullInput, futures));
    }
    getRoot() {
        return this.root;
    }
    getPath(target) {
        let nodes = [];
        this.addPaths(this.root, nodes, []);
        for (let list of nodes) {
            if (list[list.length - 1] === target) {
                let result = [];
                for (let node of list) {
                    if (node !== this.root) {
                        result.push(node.getName());
                    }
                }
                return result;
            }
        }
        return [];
    }
    findNode(path) {
        let node = this.root;
        for (let name of path) {
            node = node.getChild(name);
            if (node == null)
                return null;
        }
        return node;
    }
    findAmbiguities(consumer) {
        this.root.findAmbiguities(consumer);
    }
    addPaths(node, result, parents) {
        let current = [];
        current.push(...parents);
        current.push(node);
        result.push(current);
        for (let child of node.getChildren())
            this.addPaths(child, result, current);
    }
}
//# sourceMappingURL=CommandDispatcher.js.map