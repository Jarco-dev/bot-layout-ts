import { HandlerResult } from "@/types";
import { ClientEvents } from "discord.js";
import Client from "../../index";

export abstract class EventHandler<Event extends keyof ClientEvents> {
    protected readonly client = Client;
    public readonly name: Event;

    protected constructor(p: { name: Event }) {
        this.name = p.name;
    }

    public abstract run(
        ...args: ClientEvents[Event]
    ): HandlerResult | Promise<HandlerResult>;
}
