import StringReader from "./StringReader";
export default class ParseResults {
    constructor(context, reader, exceptions) {
        this.context = context;
        this.reader = reader || new StringReader("");
        this.exceptions = exceptions || new Map();
    }
    getContext() {
        return this.context;
    }
    getReader() {
        return this.reader;
    }
    getExceptions() {
        return this.exceptions;
    }
}
//# sourceMappingURL=ParseResults.js.map