import type { ApplicationCommandOptionData, ApplicationCommandType, CommandInteraction } from "discord.js";
import type { CommandStatus } from "../../types";
import client from "../../index";

abstract class BaseCommand {
    public name: string;
    public description: string;
    public type: ApplicationCommandType;
    public options?: ApplicationCommandOptionData[];
    public defaultPermission?: boolean;
    public cooldown: number = 0;
    public disableDm: boolean = false;
    public status: CommandStatus;

    public client = client;
    public prisma = client.prisma;
    public sConfig = client.sConfig;
    public config = client.config;
    public logger = client.logger;
    public sender = client.sender;
    public global = client.global;

    protected constructor(p: {
        name: string;
        description: string;
        type?: ApplicationCommandType;
        options?: ApplicationCommandOptionData[];
        defaultPermission?: boolean;
        cooldown?: number;
        disableDm?: boolean;
        status: CommandStatus;
    }) {
        this.name = p.name;
        this.description = p.description;
        this.type = p.type ?? "CHAT_INPUT";
        this.options = p.options ?? undefined;
        this.defaultPermission = p.defaultPermission;
        this.cooldown = p.cooldown ?? 0;
        this.disableDm = p.disableDm ?? false;
        this.status = p.status;
    }

    public abstract run(i: CommandInteraction): void;
}

export default BaseCommand;
