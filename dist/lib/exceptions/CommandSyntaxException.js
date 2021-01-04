import BuiltInExceptions from "./BuiltInExceptions";
export default class CommandSyntaxException extends Error {
    constructor(type, message, input = null, cursor = -1) {
        super(message.getString());
        Error.captureStackTrace(this, CommandSyntaxException);
        this.type = type;
        this.__message = message;
        this.input = input;
        this.cursor = cursor;
        this.message = this.getMessage();
    }
    getMessage() {
        let message = this.__message.getString();
        let context = this.getContext();
        if (context != null) {
            message += " at position " + this.cursor + ": " + context;
        }
        return message;
    }
    getRawMessage() {
        return this.__message;
    }
    getContext() {
        if (this.input == null || this.cursor < 0) {
            return null;
        }
        let builder = "";
        let cursor = Math.min(this.input.length, this.cursor);
        if (cursor > CommandSyntaxException.CONTEXT_AMOUNT) {
            builder += "...";
        }
        builder += this.input.substring(Math.max(0, cursor - CommandSyntaxException.CONTEXT_AMOUNT), cursor);
        builder += "<--[HERE]";
        return builder;
    }
    getType() {
        return this.type;
    }
    getInput() {
        return this.input;
    }
    getCursor() {
        return this.cursor;
    }
    toString() {
        return this.message;
    }
}
CommandSyntaxException.CONTEXT_AMOUNT = 10;
CommandSyntaxException.BUILT_IN_EXCEPTIONS = new BuiltInExceptions();
//# sourceMappingURL=CommandSyntaxException.js.map