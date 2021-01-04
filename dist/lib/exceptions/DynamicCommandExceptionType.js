import CommandSyntaxException from "./CommandSyntaxException";
export default class DynamicCommandExceptionType {
    constructor(fn) {
        this.fn = fn;
        Error.captureStackTrace(this, DynamicCommandExceptionType);
    }
    create(...args) {
        return new CommandSyntaxException(this, this.fn(...args));
    }
    createWithContext(reader, ...args) {
        return new CommandSyntaxException(this, this.fn(...args), reader.getString(), reader.getCursor());
    }
}
//# sourceMappingURL=DynamicCommandExceptionType.js.map