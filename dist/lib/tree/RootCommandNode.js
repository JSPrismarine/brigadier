import CommandNode from "./CommandNode";
import Suggestions from "../suggestion/Suggestions";
export default class RootCommandNode extends CommandNode {
    constructor() {
        super(null, s => true, null, (s) => s.getSource(), false);
    }
    getNodeType() {
        return "root";
    }
    getName() {
        return "";
    }
    getUsageText() {
        return "";
    }
    parse(reader, contextBuilder) {
    }
    listSuggestions(context, builder) {
        return Suggestions.empty();
    }
    isValidInput(input) {
        return false;
    }
    equals(o) {
        if (this === o)
            return true;
        if (!(o instanceof RootCommandNode))
            return false;
        return super.equals(o);
    }
    createBuilder() {
        throw new Error("Cannot convert root into a builder");
    }
    getSortedKey() {
        return "";
    }
    getExamples() {
        return [];
    }
    toString() {
        return "<root>";
    }
}
//# sourceMappingURL=RootCommandNode.js.map