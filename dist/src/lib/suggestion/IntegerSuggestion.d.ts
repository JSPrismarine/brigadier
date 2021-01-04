import Message from "../Message";
import StringRange from "../context/StringRange";
import Suggestion from "./Suggestion";
export default class IntegerSuggestion extends Suggestion {
    private value;
    constructor(range: StringRange, value: number, tooltip?: Message);
    getValue(): number;
    equals(o: object): boolean;
    toString(): String;
    compareTo(o: Suggestion): number;
    compareToIgnoreCase(b: Suggestion): number;
}
