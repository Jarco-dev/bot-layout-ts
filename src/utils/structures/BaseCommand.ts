import type { ApplicationCommandOptionData, ApplicationCommandType, CommandInteraction, PermissionResolvable } from "discord.js";
import type { CommandStatus } from "../../types";
import Base from "./Base";

abstract class BaseCommand extends Base {
    public name: string;
    public description: string;
    public type: ApplicationCommandType;
    public options?: ApplicationCommandOptionData[];
    public defaultPermission?: boolean;
    public cooldown: number = 0;
    public nsfw: boolean = false;
    public disableDm: boolean = false;
    public botPermissions: PermissionResolvable[];
    public status: CommandStatus;

    protected constructor(p: {
        name: string;
        description: string;
        type?: ApplicationCommandType;
        options?: ApplicationCommandOptionData[];
        defaultPermission?: boolean;
        cooldown?: number;
        nsfw?: boolean;
        disableDm?: boolean;
        botPermissions?: PermissionResolvable[];
        status: CommandStatus;
    }) {
        super();

        this.name = p.name;
        this.description = p.description;
        this.type = p.type ?? "CHAT_INPUT";
        this.options = p.options ?? undefined;
        this.defaultPermission = p.defaultPermission;
        this.cooldown = p.cooldown ?? 0;
        this.nsfw = p.nsfw ?? false;
        this.disableDm = p.disableDm ?? false;
        this.botPermissions = p.botPermissions ?? [];
        this.status = p.status;
    }

    public abstract run(i: CommandInteraction): void;
}

export default BaseCommand;
