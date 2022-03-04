import type { Interaction } from "discord.js";
import type Client from "../../index";
import { DMChannel } from "discord.js";
import BaseEvent from "../../utils/structures/BaseEvent";

class InteractionCreateEvent extends BaseEvent {
    public cmdCooldown: { [key: string]: number };
    private readonly commands: typeof Client.commandLoader.commands;

    constructor() {
        super("interactionCreate");

        this.commands = this.client.commandLoader.commands;
        this.cmdCooldown = {};
    }

    public async run(i: Interaction): Promise<void> {
        // Commands
        if (i.isCommand()) {
            try {
                // Get the corresponding command
                const command = this.commands[i.commandName];
                if (!command) throw new Error(`The ${i?.commandName} command could not be found`);

                // Process command options
                if (i.channel instanceof DMChannel) {
                    // disableDm
                    if (command.disableDm) {
                        this.sender.reply(i, { content: "This command is disabled outside of servers!" }, {
                            delTime: 5000,
                            msgType: "INVALID"
                        }).catch(() => { });
                        return;
                    }
                }

                // Check user command cooldown
                if (command.cooldown > 0) {
                    const key: string = `${command.name}_${i.user.id}`;
                    if (this.cmdCooldown[key]) {
                        const diff = this.cmdCooldown[key] - Date.now();
                        const timeLeft = this.global.parseTime((diff >= 1000) ? diff : 1000);
                        this.sender.reply(i, {
                            content: `Please wait \`${timeLeft}\` and try again`,
                            ephemeral: true
                        }, { msgType: "TIME" });
                        return;
                    } else {
                        this.cmdCooldown[key] = Date.now() + command.cooldown;
                        setTimeout(() => delete this.cmdCooldown[key], command.cooldown);
                    }
                }

                // Run the command
                try {
                    command.run(i);
                } catch (err) {
                    this.logger.error(`Error while executing a command commandName: ${command.name}${(i.inGuild()) ? ` guildId: ${i.guild!.id}` : ""}`, err);
                    this.sender.reply(i, { content: "Something went wrong while running the command, the command might have not worked fully!" }, { msgType: "ERROR" });
                }
            } catch (err) {
                this.logger.error(`Error while going through command handler`, err);
                this.sender.reply(i, { content: "Something went wrong, please try again" }, { msgType: "ERROR" });
            }
        }
    }
}

export default InteractionCreateEvent;
