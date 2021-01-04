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
exports.RootCommandNode = exports.LiteralCommandNode = exports.ArgumentCommandNode = exports.SuggestionsBuilder = exports.Suggestions = exports.Suggestion = exports.DynamicCommandExceptionType = exports.SimpleCommandExceptionType = exports.CommandSyntaxException = exports.SuggestionsContext = exports.StringRange = exports.ParsedCommandNode = exports.ParsedArgument = exports.CommandContextBuilder = exports.CommandContext = exports.RequiredArgumentBuilder = exports.LiteralArgumentBuilder = exports.StringReader = exports.ParseResults = exports.LiteralMessage = exports.CommandDispatcher = exports.argument = exports.literal = exports.float = exports.integer = exports.bool = exports.greedyString = exports.string = exports.word = void 0;
const CommandDispatcher_1 = __importDefault(require("./lib/CommandDispatcher"));
exports.CommandDispatcher = CommandDispatcher_1.default;
const LiteralMessage_1 = __importDefault(require("./lib/LiteralMessage"));
exports.LiteralMessage = LiteralMessage_1.default;
const ParseResults_1 = __importDefault(require("./lib/ParseResults"));
exports.ParseResults = ParseResults_1.default;
const StringReader_1 = __importDefault(require("./lib/StringReader"));
exports.StringReader = StringReader_1.default;
const ArgumentType_1 = require("./lib/arguments/ArgumentType");
const LiteralArgumentBuilder_1 = __importStar(require("./lib/builder/LiteralArgumentBuilder"));
exports.LiteralArgumentBuilder = LiteralArgumentBuilder_1.default;
Object.defineProperty(exports, "literal", { enumerable: true, get: function () { return LiteralArgumentBuilder_1.literal; } });
const RequiredArgumentBuilder_1 = __importStar(require("./lib/builder/RequiredArgumentBuilder"));
exports.RequiredArgumentBuilder = RequiredArgumentBuilder_1.default;
Object.defineProperty(exports, "argument", { enumerable: true, get: function () { return RequiredArgumentBuilder_1.argument; } });
const CommandContext_1 = __importDefault(require("./lib/context/CommandContext"));
exports.CommandContext = CommandContext_1.default;
const CommandContextBuilder_1 = __importDefault(require("./lib/context/CommandContextBuilder"));
exports.CommandContextBuilder = CommandContextBuilder_1.default;
const ParsedArgument_1 = __importDefault(require("./lib/context/ParsedArgument"));
exports.ParsedArgument = ParsedArgument_1.default;
const ParsedCommandNode_1 = __importDefault(require("./lib/context/ParsedCommandNode"));
exports.ParsedCommandNode = ParsedCommandNode_1.default;
const StringRange_1 = __importDefault(require("./lib/context/StringRange"));
exports.StringRange = StringRange_1.default;
const SuggestionContext_1 = __importDefault(require("./lib/context/SuggestionContext"));
exports.SuggestionsContext = SuggestionContext_1.default;
const CommandSyntaxException_1 = __importDefault(require("./lib/exceptions/CommandSyntaxException"));
exports.CommandSyntaxException = CommandSyntaxException_1.default;
const DynamicCommandExceptionType_1 = __importDefault(require("./lib/exceptions/DynamicCommandExceptionType"));
exports.DynamicCommandExceptionType = DynamicCommandExceptionType_1.default;
const SimpleCommandExceptionType_1 = __importDefault(require("./lib/exceptions/SimpleCommandExceptionType"));
exports.SimpleCommandExceptionType = SimpleCommandExceptionType_1.default;
const Suggestion_1 = __importDefault(require("./lib/suggestion/Suggestion"));
exports.Suggestion = Suggestion_1.default;
const Suggestions_1 = __importDefault(require("./lib/suggestion/Suggestions"));
exports.Suggestions = Suggestions_1.default;
const SuggestionsBuilder_1 = __importDefault(require("./lib/suggestion/SuggestionsBuilder"));
exports.SuggestionsBuilder = SuggestionsBuilder_1.default;
const ArgumentCommandNode_1 = __importDefault(require("./lib/tree/ArgumentCommandNode"));
exports.ArgumentCommandNode = ArgumentCommandNode_1.default;
const LiteralCommandNode_1 = __importDefault(require("./lib/tree/LiteralCommandNode"));
exports.LiteralCommandNode = LiteralCommandNode_1.default;
const RootCommandNode_1 = __importDefault(require("./lib/tree/RootCommandNode"));
exports.RootCommandNode = RootCommandNode_1.default;
const { word, string, greedyString, bool, integer, float } = ArgumentType_1.DefaultType;
exports.word = word;
exports.string = string;
exports.greedyString = greedyString;
exports.bool = bool;
exports.integer = integer;
exports.float = float;
//# sourceMappingURL=index.js.map