import Client from "../../index";
import { HandlerResult } from "@/types";
import { AutocompleteInteraction } from "discord.js";

export abstract class Autocomplete {
    protected readonly client = Client;
    public readonly data: { commandName: string };
    public readonly enabled: boolean;

    protected constructor(p: {
        data: { commandName: string };
        enabled?: boolean;
    }) {
        this.data = p.data;
        this.enabled = p.enabled ?? true;
    }

    public abstract run(
        i: AutocompleteInteraction
    ): HandlerResult | Promise<HandlerResult>;
}
