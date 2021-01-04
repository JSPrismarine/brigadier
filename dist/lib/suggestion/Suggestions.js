import isEqual from "../util/isEqual";
import StringRange from "../context/StringRange";
export default class Suggestions {
    constructor(range, suggestions) {
        this.range = range;
        this.suggestions = suggestions;
    }
    getRange() {
        return this.range;
    }
    getList() {
        return this.suggestions;
    }
    isEmpty() {
        return this.suggestions.length === 0;
    }
    equals(o) {
        if (this === o)
            return true;
        if (!(o instanceof Suggestions))
            return false;
        return this.range.equals(o.range) && isEqual(this.suggestions, o.suggestions);
    }
    toString() {
        return "Suggestions{" +
            "range=" + this.range +
            ", suggestions=" + this.suggestions + '}';
    }
    static empty() {
        return Promise.resolve(this.EMPTY);
    }
    static merge(command, input) {
        if (input.length === 0) {
            return this.EMPTY;
        }
        else if (input.length === 1) {
            return input[0];
        }
        const texts = [];
        for (let suggestions of input) {
            texts.push(...suggestions.getList());
        }
        return Suggestions.create(command, texts);
    }
    static create(command, suggestions) {
        if (suggestions.length === 0) {
            return this.EMPTY;
        }
        let start = Infinity;
        let end = -Infinity;
        for (let suggestion of suggestions) {
            start = Math.min(suggestion.getRange().getStart(), start);
            end = Math.max(suggestion.getRange().getEnd(), end);
        }
        let range = new StringRange(start, end);
        const texts = [];
        for (let suggestion of suggestions) {
            texts.push(suggestion.expand(command, range));
        }
        const sorted = texts.sort((a, b) => a.compareToIgnoreCase(b));
        return new Suggestions(range, sorted);
    }
}
Suggestions.EMPTY = new Suggestions(StringRange.at(0), []);
//# sourceMappingURL=Suggestions.js.map