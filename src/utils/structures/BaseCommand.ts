import type { CommandInteraction, SlashCommandBuilder } from "discord.js";
import type { RESTPostAPIApplicationCommandsJSONBody } from "discord-api-types/v10";
import type { CommandStatus } from "../../types";
import Client from "../../index";

abstract class BaseCommand {
    public cmdData: RESTPostAPIApplicationCommandsJSONBody;
    public cooldown: number = 0;
    public status: CommandStatus;

    public client = Client;
    public prisma = Client.prisma;
    public sConfig = Client.sConfig;
    public config = Client.config;
    public logger = Client.logger;
    public sender = Client.sender;
    public global = Client.global;

    protected constructor(p: {
        cmdData: Pick<SlashCommandBuilder, "toJSON">;
        defaultPermission?: boolean;
        cooldown?: number;
        status: CommandStatus;
    }) {
        this.cmdData = p.cmdData.toJSON();
        this.cooldown = p.cooldown ?? 0;
        this.status = p.status;
    }

    public abstract run(i: CommandInteraction): void;
}

export default BaseCommand;
