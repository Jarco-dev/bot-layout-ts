import Base from "./Base";

abstract class BaseEvent extends Base {
    public name: string;

    protected constructor(name: string) {
        super();

        this.name = name;
    }

    public abstract run(...args: unknown[]): void;
}

export default BaseEvent;
