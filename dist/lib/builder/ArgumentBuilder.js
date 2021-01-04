import CommandNode from "../tree/CommandNode";
import RootCommandNode from "../tree/RootCommandNode";
class ArgumentBuilder {
    constructor() {
        this.args = new RootCommandNode();
        this.modifier = null;
    }
    then(arg) {
        if (!(this.target == null)) {
            throw new Error("Cannot add children to a redirected node");
        }
        if (arg instanceof CommandNode)
            this.args.addChild(arg);
        else
            this.args.addChild(arg.build());
        return this.getThis();
    }
    getArguments() {
        return this.args.getChildren();
    }
    executes(command) {
        this.command = command;
        return this.getThis();
    }
    getCommand() {
        return this.command;
    }
    requires(requirement) {
        this.requirement = requirement;
        return this.getThis();
    }
    getRequirement() {
        return this.requirement;
    }
    redirect(target, modifier) {
        return this.forward(target, modifier == null ? null : (o) => [modifier.apply(o)], false);
    }
    fork(target, modifier) {
        return this.forward(target, modifier, true);
    }
    forward(target, modifier, fork) {
        if (this.args.getChildrenCount() > 0) {
            throw new Error("Cannot forward a node with children");
        }
        this.target = target;
        this.modifier = modifier;
        this.forks = fork;
        return this.getThis();
    }
    getRedirect() {
        return this.target;
    }
    getRedirectModifier() {
        return this.modifier;
    }
    isFork() {
        return this.forks;
    }
}
export default ArgumentBuilder;
//# sourceMappingURL=ArgumentBuilder.js.map