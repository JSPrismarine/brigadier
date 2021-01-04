import isEqual from "../util/isEqual";
import StringReader from "../StringReader";
import RequiredArgumentBuilder from "../builder/RequiredArgumentBuilder";
import ParsedArgument from "../context/ParsedArgument";
import Suggestions from "../suggestion/Suggestions";
import CommandNode from "./CommandNode";
const USAGE_ARGUMENT_OPEN = "<";
const USAGE_ARGUMENT_CLOSE = ">";
export default class ArgumentCommandNode extends CommandNode {
    constructor(name, type, command, requirement, redirect, modifier, forks, customSuggestions) {
        super(command, requirement, redirect, modifier, forks);
        this.name = name;
        this.type = type;
        this.customSuggestions = customSuggestions;
    }
    getNodeType() {
        return "argument";
    }
    getType() {
        return this.type;
    }
    getName() {
        return this.name;
    }
    getUsageText() {
        return USAGE_ARGUMENT_OPEN + this.name + USAGE_ARGUMENT_CLOSE;
    }
    getCustomSuggestions() {
        return this.customSuggestions;
    }
    parse(reader, contextBuilder) {
        let start = reader.getCursor();
        let result = this.type.parse(reader);
        let parsed = new ParsedArgument(start, reader.getCursor(), result);
        contextBuilder.withArgument(this.name, parsed);
        contextBuilder.withNode(this, parsed.getRange());
    }
    listSuggestions(context, builder) {
        if (this.customSuggestions == null) {
            if (typeof this.type.listSuggestions === "function")
                return this.type.listSuggestions(context, builder);
            else
                return Suggestions.empty();
        }
        else {
            return this.customSuggestions.getSuggestions(context, builder);
        }
    }
    createBuilder() {
        let builder = RequiredArgumentBuilder.argument(this.name, this.type);
        builder.requires(this.getRequirement());
        builder.forward(this.getRedirect(), this.getRedirectModifier(), this.isFork());
        builder.suggests(this.customSuggestions);
        if (this.getCommand() != null) {
            builder.executes(this.getCommand());
        }
        return builder;
    }
    isValidInput(input) {
        try {
            let reader = new StringReader(input);
            this.type.parse(reader);
            return !reader.canRead() || reader.peek() == ' ';
        }
        catch (ignored) {
        }
        return false;
    }
    equals(o) {
        if (this === o)
            return true;
        if (!(o instanceof ArgumentCommandNode))
            return false;
        if (!(this.name === o.name))
            return false;
        if (!isEqual(this.type, o.type))
            return false;
        return super.equals(o);
    }
    getSortedKey() {
        return this.name;
    }
    getExamples() {
        return typeof this.type.getExamples === "function" ? this.type.getExamples() : [];
    }
    toString() {
        return "<argument " + this.name + ":" + this.type + ">";
    }
}
//# sourceMappingURL=ArgumentCommandNode.js.map