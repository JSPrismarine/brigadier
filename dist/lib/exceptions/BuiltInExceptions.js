import LiteralMessage from "../LiteralMessage";
import SimpleCommandExceptionType from "./SimpleCommandExceptionType";
import DynamicCommandExceptionType from "./DynamicCommandExceptionType";
export default class BuiltInExceptions {
    floatTooLow() {
        return BuiltInExceptions.FLOAT_TOO_SMALL;
    }
    floatTooHigh() {
        return BuiltInExceptions.FLOAT_TOO_BIG;
    }
    integerTooLow() {
        return BuiltInExceptions.INTEGER_TOO_SMALL;
    }
    integerTooHigh() {
        return BuiltInExceptions.INTEGER_TOO_BIG;
    }
    literalIncorrect() {
        return BuiltInExceptions.LITERAL_INCORRECT;
    }
    readerExpectedStartOfQuote() {
        return BuiltInExceptions.READER_EXPECTED_START_OF_QUOTE;
    }
    readerExpectedEndOfQuote() {
        return BuiltInExceptions.READER_EXPECTED_END_OF_QUOTE;
    }
    readerInvalidEscape() {
        return BuiltInExceptions.READER_INVALID_ESCAPE;
    }
    readerInvalidBool() {
        return BuiltInExceptions.READER_INVALID_BOOL;
    }
    readerInvalidInt() {
        return BuiltInExceptions.READER_INVALID_INT;
    }
    readerExpectedInt() {
        return BuiltInExceptions.READER_EXPECTED_INT;
    }
    readerInvalidFloat() {
        return BuiltInExceptions.READER_INVALID_FLOAT;
    }
    readerExpectedFloat() {
        return BuiltInExceptions.READER_EXPECTED_FLOAT;
    }
    readerExpectedBool() {
        return BuiltInExceptions.READER_EXPECTED_BOOL;
    }
    readerExpectedSymbol() {
        return BuiltInExceptions.READER_EXPECTED_SYMBOL;
    }
    dispatcherUnknownCommand() {
        return BuiltInExceptions.DISPATCHER_UNKNOWN_COMMAND;
    }
    dispatcherUnknownArgument() {
        return BuiltInExceptions.DISPATCHER_UNKNOWN_ARGUMENT;
    }
    dispatcherExpectedArgumentSeparator() {
        return BuiltInExceptions.DISPATCHER_EXPECTED_ARGUMENT_SEPARATOR;
    }
    dispatcherParseException() {
        return BuiltInExceptions.DISPATCHER_PARSE_EXCEPTION;
    }
}
BuiltInExceptions.FLOAT_TOO_SMALL = new DynamicCommandExceptionType((found, min) => new LiteralMessage("Float must not be less than " + min + ", found " + found));
BuiltInExceptions.FLOAT_TOO_BIG = new DynamicCommandExceptionType((found, max) => new LiteralMessage("Float must not be more than " + max + ", found " + found));
BuiltInExceptions.INTEGER_TOO_SMALL = new DynamicCommandExceptionType((found, min) => new LiteralMessage("Integer must not be less than " + min + ", found " + found));
BuiltInExceptions.INTEGER_TOO_BIG = new DynamicCommandExceptionType((found, max) => new LiteralMessage("Integer must not be more than " + max + ", found " + found));
BuiltInExceptions.LITERAL_INCORRECT = new DynamicCommandExceptionType(expected => new LiteralMessage("Expected literal " + expected));
BuiltInExceptions.READER_EXPECTED_START_OF_QUOTE = new SimpleCommandExceptionType(new LiteralMessage("Expected quote to start a string"));
BuiltInExceptions.READER_EXPECTED_END_OF_QUOTE = new SimpleCommandExceptionType(new LiteralMessage("Unclosed quoted string"));
BuiltInExceptions.READER_INVALID_ESCAPE = new DynamicCommandExceptionType(character => new LiteralMessage("Invalid escape sequence '" + character + "' in quoted string"));
BuiltInExceptions.READER_INVALID_BOOL = new DynamicCommandExceptionType(value => new LiteralMessage("Invalid bool, expected true or false but found '" + value + "'"));
BuiltInExceptions.READER_INVALID_INT = new DynamicCommandExceptionType(value => new LiteralMessage("Invalid integer '" + value + "'"));
BuiltInExceptions.READER_EXPECTED_INT = new SimpleCommandExceptionType(new LiteralMessage("Expected integer"));
BuiltInExceptions.READER_INVALID_FLOAT = new DynamicCommandExceptionType(value => new LiteralMessage("Invalid float '" + value + "'"));
BuiltInExceptions.READER_EXPECTED_FLOAT = new SimpleCommandExceptionType(new LiteralMessage("Expected float"));
BuiltInExceptions.READER_EXPECTED_BOOL = new SimpleCommandExceptionType(new LiteralMessage("Expected bool"));
BuiltInExceptions.READER_EXPECTED_SYMBOL = new DynamicCommandExceptionType(symbol => new LiteralMessage("Expected '" + symbol + "'"));
BuiltInExceptions.DISPATCHER_UNKNOWN_COMMAND = new SimpleCommandExceptionType(new LiteralMessage("Unknown command"));
BuiltInExceptions.DISPATCHER_UNKNOWN_ARGUMENT = new SimpleCommandExceptionType(new LiteralMessage("Incorrect argument for command"));
BuiltInExceptions.DISPATCHER_EXPECTED_ARGUMENT_SEPARATOR = new SimpleCommandExceptionType(new LiteralMessage("Expected whitespace to end one argument, but found trailing data"));
BuiltInExceptions.DISPATCHER_PARSE_EXCEPTION = new DynamicCommandExceptionType(message => new LiteralMessage(("Could not parse command: " + message)));
//# sourceMappingURL=BuiltInExceptions.js.map