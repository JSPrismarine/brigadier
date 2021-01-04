"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.float = exports.integer = exports.bool = exports.greedyString = exports.string = exports.word = void 0;
const CommandDispatcher_1 = __importDefault(require("./lib/CommandDispatcher"));
const LiteralMessage_1 = __importDefault(require("./lib/LiteralMessage"));
const ParseResults_1 = __importDefault(require("./lib/ParseResults"));
const StringReader_1 = __importDefault(require("./lib/StringReader"));
const ArgumentType_1 = require("./lib/arguments/ArgumentType");
const LiteralArgumentBuilder_1 = __importStar(require("./lib/builder/LiteralArgumentBuilder"));
const RequiredArgumentBuilder_1 = __importStar(require("./lib/builder/RequiredArgumentBuilder"));
const CommandContext_1 = __importDefault(require("./lib/context/CommandContext"));
const CommandContextBuilder_1 = __importDefault(require("./lib/context/CommandContextBuilder"));
const ParsedArgument_1 = __importDefault(require("./lib/context/ParsedArgument"));
const ParsedCommandNode_1 = __importDefault(require("./lib/context/ParsedCommandNode"));
const StringRange_1 = __importDefault(require("./lib/context/StringRange"));
const SuggestionContext_1 = __importDefault(require("./lib/context/SuggestionContext"));
const CommandSyntaxException_1 = __importDefault(require("./lib/exceptions/CommandSyntaxException"));
const DynamicCommandExceptionType_1 = __importDefault(require("./lib/exceptions/DynamicCommandExceptionType"));
const SimpleCommandExceptionType_1 = __importDefault(require("./lib/exceptions/SimpleCommandExceptionType"));
const Suggestion_1 = __importDefault(require("./lib/suggestion/Suggestion"));
const Suggestions_1 = __importDefault(require("./lib/suggestion/Suggestions"));
const SuggestionsBuilder_1 = __importDefault(require("./lib/suggestion/SuggestionsBuilder"));
const ArgumentCommandNode_1 = __importDefault(require("./lib/tree/ArgumentCommandNode"));
const LiteralCommandNode_1 = __importDefault(require("./lib/tree/LiteralCommandNode"));
const RootCommandNode_1 = __importDefault(require("./lib/tree/RootCommandNode"));
exports.word = ArgumentType_1.DefaultType.word, exports.string = ArgumentType_1.DefaultType.string, exports.greedyString = ArgumentType_1.DefaultType.greedyString, exports.bool = ArgumentType_1.DefaultType.bool, exports.integer = ArgumentType_1.DefaultType.integer, exports.float = ArgumentType_1.DefaultType.float;
exports.default = {
    dispatcher: new CommandDispatcher_1.default(),
    word: exports.word, string: exports.string, greedyString: exports.greedyString, bool: exports.bool, integer: exports.integer, float: exports.float,
    literal: LiteralArgumentBuilder_1.literal, argument: RequiredArgumentBuilder_1.argument,
    CommandDispatcher: CommandDispatcher_1.default,
    LiteralMessage: LiteralMessage_1.default,
    ParseResults: ParseResults_1.default,
    StringReader: StringReader_1.default,
    LiteralArgumentBuilder: LiteralArgumentBuilder_1.default,
    RequiredArgumentBuilder: RequiredArgumentBuilder_1.default,
    CommandContext: CommandContext_1.default,
    CommandContextBuilder: CommandContextBuilder_1.default,
    ParsedArgument: ParsedArgument_1.default,
    ParsedCommandNode: ParsedCommandNode_1.default,
    StringRange: StringRange_1.default,
    SuggestionsContext: SuggestionContext_1.default,
    CommandSyntaxException: CommandSyntaxException_1.default,
    SimpleCommandExceptionType: SimpleCommandExceptionType_1.default,
    DynamicCommandExceptionType: DynamicCommandExceptionType_1.default,
    Suggestion: Suggestion_1.default,
    Suggestions: Suggestions_1.default,
    SuggestionsBuilder: SuggestionsBuilder_1.default,
    ArgumentCommandNode: ArgumentCommandNode_1.default,
    LiteralCommandNode: LiteralCommandNode_1.default,
    RootCommandNode: RootCommandNode_1.default
};
//# sourceMappingURL=index.js.map