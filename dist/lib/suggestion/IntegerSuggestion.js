import Suggestion from "./Suggestion";
export default class IntegerSuggestion extends Suggestion {
    constructor(range, value, tooltip = null) {
        super(range, value.toString(), tooltip);
        this.value = value;
    }
    getValue() {
        return this.value;
    }
    equals(o) {
        if (this === o)
            return true;
        if (!(o instanceof IntegerSuggestion))
            return false;
        return this.value == o.value && super.equals(o);
    }
    toString() {
        return "IntegerSuggestion{" +
            "value=" + this.value +
            ", range=" + this.getRange() +
            ", text='" + this.getText() + '\'' +
            ", tooltip='" + this.getTooltip() + '\'' +
            '}';
    }
    compareTo(o) {
        if (o instanceof IntegerSuggestion) {
            return this.value < o.value ? 1 : -1;
        }
        return super.compareTo(o);
    }
    compareToIgnoreCase(b) {
        return this.compareTo(b);
    }
}
//# sourceMappingURL=IntegerSuggestion.js.map