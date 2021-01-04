import StringReader from "../StringReader";
import CommandContext from "../context/CommandContext";
import ArgumentType from "./ArgumentType";
export declare enum StringType {
    SINGLE_WORD = "words_with_underscores",
    QUOTABLE_PHRASE = "\"quoted phrase\"",
    GREEDY_PHRASE = "words with spaces"
}
export default class StringArgumentType implements ArgumentType<string> {
    private type;
    private constructor();
    static word(): StringArgumentType;
    static string(): StringArgumentType;
    static greedyString(): StringArgumentType;
    static getString(context: CommandContext<any>, name: string): string;
    getType(): StringType;
    parse(reader: StringReader): string;
    toString(): string;
    static escapeIfRequired(input: string): String;
    private static escape;
}
