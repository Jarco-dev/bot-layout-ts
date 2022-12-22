import { HandlerResult } from "@/types";
import { ButtonBuilder, ButtonInteraction } from "discord.js";
import Client from "../../index";

export abstract class ButtonComponent {
    protected readonly client = Client;
    public readonly data: ReturnType<ButtonBuilder["toJSON"]>;
    public readonly enabled: boolean;

    protected constructor(p: {
        builder: Pick<ButtonBuilder, "toJSON">;
        enabled: boolean;
    }) {
        this.data = p.builder.toJSON();
        this.enabled = p.enabled;
    }

    public abstract run(
        i: ButtonInteraction
    ): HandlerResult | Promise<HandlerResult>;
}
