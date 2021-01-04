import CommandNode from "./CommandNode";
import StringReader from "../StringReader";
import LiteralArgumentBuilder from "../builder/LiteralArgumentBuilder";
import StringRange from "../context/StringRange";
import CommandSyntaxException from "../exceptions/CommandSyntaxException";
import Suggestions from "../suggestion/Suggestions";
export default class LiteralCommandNode extends CommandNode {
    constructor(literal, command, requirement, redirect, modifier, forks) {
        super(command, requirement, redirect, modifier, forks);
        this.literal = literal;
    }
    getNodeType() {
        return "literal";
    }
    getLiteral() {
        return this.literal;
    }
    getName() {
        return this.literal;
    }
    parse(reader, contextBuilder) {
        let start = reader.getCursor();
        let end = this.__parse(reader);
        if (end > -1) {
            contextBuilder.withNode(this, StringRange.between(start, end));
            return;
        }
        throw CommandSyntaxException.BUILT_IN_EXCEPTIONS.literalIncorrect().createWithContext(reader, this.literal);
    }
    __parse(reader) {
        let start = reader.getCursor();
        if (reader.canRead(this.literal.length)) {
            let end = start + this.literal.length;
            if (reader.getString().substring(start, end) === this.literal) {
                reader.setCursor(end);
                if (!reader.canRead() || reader.peek() == ' ') {
                    return end;
                }
                else {
                    reader.setCursor(start);
                }
            }
        }
        return -1;
    }
    listSuggestions(context, builder) {
        if (this.literal.toLowerCase().startsWith(builder.getRemaining().toLowerCase())) {
            return builder.suggest(this.literal).buildPromise();
        }
        else {
            return Suggestions.empty();
        }
    }
    isValidInput(input) {
        return this.__parse(new StringReader(input)) > -1;
    }
    equals(o) {
        if (this === o)
            return true;
        if (!(o instanceof LiteralCommandNode))
            return false;
        if (!(this.literal === o.literal))
            return false;
        return super.equals(o);
    }
    getUsageText() {
        return this.literal;
    }
    createBuilder() {
        let builder = LiteralArgumentBuilder.literal(this.literal);
        builder.requires(this.getRequirement());
        builder.forward(this.getRedirect(), this.getRedirectModifier(), this.isFork());
        if (this.getCommand() != null)
            builder.executes(this.getCommand());
        return builder;
    }
    getSortedKey() {
        return this.literal;
    }
    getExamples() {
        return [this.literal];
    }
    toString() {
        return "<literal " + this.literal + ">";
    }
}
//# sourceMappingURL=LiteralCommandNode.js.map