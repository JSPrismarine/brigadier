const EXAMPLES = ["true", "false"];
export default class BoolArgumentType {
    constructor() {
    }
    static bool() {
        return new BoolArgumentType();
    }
    static getBool(context, name) {
        return context.getArgument(name, Boolean);
    }
    parse(reader) {
        return reader.readBoolean();
    }
    listSuggestions(context, builder) {
        if ("true".startsWith(builder.getRemaining().toLowerCase())) {
            builder.suggest("true");
        }
        if ("false".startsWith(builder.getRemaining().toLowerCase())) {
            builder.suggest("false");
        }
        return builder.buildPromise();
    }
    getExamples() {
        return EXAMPLES;
    }
}
//# sourceMappingURL=BoolArgumentType.js.map