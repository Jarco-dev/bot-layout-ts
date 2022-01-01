import Base from "./Base";

abstract class BaseFeature extends Base {
    public name: string;

    protected constructor(name: string) {
        super();

        this.name = name;
    }

    public abstract start(...args: unknown[]): void;
}

export default BaseFeature;
