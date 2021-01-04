import StringRange from "../context/StringRange";
import Suggestion from "./Suggestion";
import Suggestions from "./Suggestions";
import IntegerSuggestion from "./IntegerSuggestion";
export default class SuggestionsBuilder {
    constructor(input, start) {
        this.result = [];
        this.input = input;
        this.start = start;
        this.remaining = input.substring(start);
    }
    getInput() {
        return this.input;
    }
    getStart() {
        return this.start;
    }
    getRemaining() {
        return this.remaining;
    }
    build() {
        return Suggestions.create(this.input, this.result);
    }
    buildPromise() {
        return Promise.resolve(this.build());
    }
    suggest(text, tooltip = null) {
        if (typeof text === "number") {
            this.result.push(new IntegerSuggestion(StringRange.between(this.start, this.input.length), text, tooltip));
            return this;
        }
        if (text === this.remaining)
            return this;
        this.result.push(new Suggestion(StringRange.between(this.start, this.input.length), text, tooltip));
        return this;
    }
    add(other) {
        this.result.push(...other.result);
        return this;
    }
    createOffset(start) {
        return new SuggestionsBuilder(this.input, this.start);
    }
    restart() {
        return new SuggestionsBuilder(this.input, this.start);
    }
}
//# sourceMappingURL=SuggestionsBuilder.js.map