import StringRange from "./StringRange";
export default class ParsedArgument {
    constructor(start, end, result) {
        this.range = StringRange.between(start, end);
        this.result = result;
    }
    getRange() {
        return this.range;
    }
    getResult() {
        return this.result;
    }
    equals(o) {
        if (this === o)
            return true;
        if (!(o instanceof ParsedArgument))
            return false;
        return this.range.equals(o.range) && this.result === o.result;
    }
}
//# sourceMappingURL=ParsedArgument.js.map