import BoolArgumentType from './BoolArgumentType';
import CommandContext from '../context/CommandContext';
import FloatArgumentType from './FloatArgumentType';
import IntegerArgumentType from './IntegerArgumentType';
import StringArgumentType from './StringArgumentType';
import StringReader from '../StringReader';
import Suggestions from '../suggestion/Suggestions';
import SuggestionsBuilder from '../suggestion/SuggestionsBuilder';
export declare const DefaultType: {
    bool: typeof BoolArgumentType.bool;
    integer: typeof IntegerArgumentType.integer;
    float: typeof FloatArgumentType.float;
    word: typeof StringArgumentType.word;
    string: typeof StringArgumentType.string;
    greedyString: typeof StringArgumentType.greedyString;
};
export default interface ArgumentType<T> {
    parse(reader: StringReader, context: CommandContext<any>): T;
    listSuggestions?<S>(context: CommandContext<S>, builder: SuggestionsBuilder): Promise<Suggestions>;
    getExamples?(): Iterable<string>;
}
