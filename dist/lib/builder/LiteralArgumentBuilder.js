import LiteralCommandNode from "../tree/LiteralCommandNode";
import ArgumentBuilder from "./ArgumentBuilder";
export default class LiteralArgumentBuilder extends ArgumentBuilder {
    constructor(literal) {
        super();
        this.literal = literal;
    }
    static literal(name) {
        return new LiteralArgumentBuilder(name);
    }
    getThis() {
        return this;
    }
    getLiteral() {
        return this.literal;
    }
    build() {
        let result = new LiteralCommandNode(this.getLiteral(), this.getCommand(), this.getRequirement(), this.getRedirect(), this.getRedirectModifier(), this.isFork());
        for (let arg of this.getArguments()) {
            result.addChild(arg);
        }
        return result;
    }
}
export const literal = LiteralArgumentBuilder.literal;
//# sourceMappingURL=LiteralArgumentBuilder.js.map