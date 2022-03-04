import client from "../../index";

abstract class BaseEvent {
    public name: string;

    public client = client;
    public prisma = client.prisma;
    public sConfig = client.sConfig;
    public config = client.config;
    public logger = client.logger;
    public sender = client.sender;
    public global = client.global;

    protected constructor(name: string) {
        this.name = name;
    }

    public abstract run(...args: unknown[]): void;
}

export default BaseEvent;
