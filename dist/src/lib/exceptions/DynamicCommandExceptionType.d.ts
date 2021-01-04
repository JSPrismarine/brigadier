import Message from "../Message";
import CommandExceptionType from "./CommandExceptionType";
import CommandSyntaxException from "./CommandSyntaxException";
import ImmutableStringReader from "../ImmutableStringReader";
export default class DynamicCommandExceptionType implements CommandExceptionType {
    private fn;
    constructor(fn: (...args: any[]) => Message);
    create(...args: any[]): CommandSyntaxException;
    createWithContext(reader: ImmutableStringReader, ...args: any[]): CommandSyntaxException;
}
