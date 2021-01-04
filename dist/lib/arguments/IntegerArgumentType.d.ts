import StringReader from "../StringReader";
import CommandContext from "../context/CommandContext";
import ArgumentType from "./ArgumentType";
export default class IntegerArgumentType implements ArgumentType<number> {
    private minimum;
    private maximum;
    private constructor();
    static integer(min?: number, max?: number): IntegerArgumentType;
    static getInteger(context: CommandContext<any>, name: string): number;
    getMinimum(): number;
    getMaximum(): number;
    parse(reader: StringReader): number;
    equals(o: object): boolean;
    toString(): string;
    getExamples(): Iterable<string>;
}
