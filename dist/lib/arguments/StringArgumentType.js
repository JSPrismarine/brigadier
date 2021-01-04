import StringReader from "../StringReader";
export var StringType;
(function (StringType) {
    StringType["SINGLE_WORD"] = "words_with_underscores";
    StringType["QUOTABLE_PHRASE"] = "\"quoted phrase\"";
    StringType["GREEDY_PHRASE"] = "words with spaces";
})(StringType || (StringType = {}));
export default class StringArgumentType {
    constructor(type) {
        this.type = type;
    }
    static word() {
        return new StringArgumentType(StringType.SINGLE_WORD);
    }
    static string() {
        return new StringArgumentType(StringType.QUOTABLE_PHRASE);
    }
    static greedyString() {
        return new StringArgumentType(StringType.GREEDY_PHRASE);
    }
    static getString(context, name) {
        return context.getArgument(name, String);
    }
    getType() {
        return this.type;
    }
    parse(reader) {
        if (this.type == StringType.GREEDY_PHRASE) {
            let text = reader.getRemaining();
            reader.setCursor(reader.getTotalLength());
            return text;
        }
        else if (this.type == StringType.SINGLE_WORD) {
            return reader.readUnquotedString();
        }
        else {
            return reader.readString();
        }
    }
    toString() {
        return "string()";
    }
    static escapeIfRequired(input) {
        for (let c of input) {
            if (!StringReader.isAllowedInUnquotedString(c)) {
                return StringArgumentType.escape(input);
            }
        }
        return input;
    }
    static escape(input) {
        let result = "\"";
        for (let i = 0; i < input.length; i++) {
            const c = input.charAt(i);
            if (c == '\\' || c == '"') {
                result += '\\';
            }
            result += c;
        }
        result += "\"";
        return result;
    }
}
//# sourceMappingURL=StringArgumentType.js.map