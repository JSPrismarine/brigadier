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
Object.defineProperty(exports, "__esModule", { value: true });
exports.float = exports.integer = exports.bool = exports.greedyString = exports.string = exports.word = void 0;
const ArgumentType_1 = require("./lib/arguments/ArgumentType");
exports.CommandDispatcher = __importStar(require("./lib/CommandDispatcher"));
exports.LiteralMessage = __importStar(require("./lib/LiteralMessage"));
exports.ParseResults = __importStar(require("./lib/ParseResults"));
exports.StringReader = __importStar(require("./lib/StringReader"));
var ArgumentType_2 = require("./lib/arguments/ArgumentType");
Object.defineProperty(exports, "DefaultType", { enumerable: true, get: function () { return ArgumentType_2.DefaultType; } });
exports.LiteralArgumentBuilder = __importStar(require("./lib/builder/LiteralArgumentBuilder"));
var LiteralArgumentBuilder_1 = require("./lib/builder/LiteralArgumentBuilder");
Object.defineProperty(exports, "literal", { enumerable: true, get: function () { return LiteralArgumentBuilder_1.literal; } });
exports.RequiredArgumentBuilder = __importStar(require("./lib/builder/RequiredArgumentBuilder"));
var RequiredArgumentBuilder_1 = require("./lib/builder/RequiredArgumentBuilder");
Object.defineProperty(exports, "argument", { enumerable: true, get: function () { return RequiredArgumentBuilder_1.argument; } });
exports.CommandContext = __importStar(require("./lib/context/CommandContext"));
exports.CommandContextBuilder = __importStar(require("./lib/context/CommandContextBuilder"));
exports.ParsedArgument = __importStar(require("./lib/context/ParsedArgument"));
exports.ParsedCommandNode = __importStar(require("./lib/context/ParsedCommandNode"));
exports.StringRange = __importStar(require("./lib/context/StringRange"));
exports.SuggestionsContext = __importStar(require("./lib/context/SuggestionContext"));
exports.CommandSyntaxException = __importStar(require("./lib/exceptions/CommandSyntaxException"));
exports.DynamicCommandExceptionType = __importStar(require("./lib/exceptions/DynamicCommandExceptionType"));
exports.SimpleCommandExceptionType = __importStar(require("./lib/exceptions/SimpleCommandExceptionType"));
exports.Suggestion = __importStar(require("./lib/suggestion/Suggestion"));
exports.Suggestions = __importStar(require("./lib/suggestion/Suggestions"));
exports.SuggestionsBuilder = __importStar(require("./lib/suggestion/SuggestionsBuilder"));
exports.ArgumentCommandNode = __importStar(require("./lib/tree/ArgumentCommandNode"));
exports.LiteralCommandNode = __importStar(require("./lib/tree/LiteralCommandNode"));
exports.RootCommandNode = __importStar(require("./lib/tree/RootCommandNode"));
exports.word = ArgumentType_1.DefaultType.word, exports.string = ArgumentType_1.DefaultType.string, exports.greedyString = ArgumentType_1.DefaultType.greedyString, exports.bool = ArgumentType_1.DefaultType.bool, exports.integer = ArgumentType_1.DefaultType.integer, exports.float = ArgumentType_1.DefaultType.float;
//# sourceMappingURL=index.js.map