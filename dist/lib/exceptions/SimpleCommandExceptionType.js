import CommandSyntaxException from "./CommandSyntaxException";
export default class SimpleCommandExceptionType {
    constructor(message) {
        this.message = message;
        Error.captureStackTrace(this, SimpleCommandExceptionType);
    }
    create() {
        return new CommandSyntaxException(this, this.message);
    }
    createWithContext(reader) {
        return new CommandSyntaxException(this, this.message, reader.getString(), reader.getCursor());
    }
    toString() {
        return this.message.getString();
    }
}
//# sourceMappingURL=SimpleCommandExceptionType.js.map