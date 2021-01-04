import ArgumentCommandNode from "../tree/ArgumentCommandNode";
import ArgumentBuilder from "./ArgumentBuilder";
export default class RequiredArgumentBuilder extends ArgumentBuilder {
    constructor(name, type) {
        super();
        this.name = name;
        this.type = type;
    }
    static argument(name, type) {
        return new RequiredArgumentBuilder(name, type);
    }
    suggests(provider) {
        this.suggestionsProvider = provider;
        return this.getThis();
    }
    getSuggestionsProvider() {
        return this.suggestionsProvider;
    }
    getThis() {
        return this;
    }
    getType() {
        return this.type;
    }
    getName() {
        return this.name;
    }
    build() {
        let result = new ArgumentCommandNode(this.getName(), this.getType(), this.getCommand(), this.getRequirement(), this.getRedirect(), this.getRedirectModifier(), this.isFork(), this.getSuggestionsProvider());
        for (let arg of this.getArguments()) {
            result.addChild(arg);
        }
        return result;
    }
}
export const argument = RequiredArgumentBuilder.argument;
//# sourceMappingURL=RequiredArgumentBuilder.js.map