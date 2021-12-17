import type Client from "../index";
import type { SenderMessageOptions, SenderReplyOptions } from "../types";
import type { ButtonInteraction, CommandInteraction, InteractionReplyOptions, MessageComponentInteraction, MessageOptions, ReplyMessageOptions, SelectMenuInteraction, Snowflake, TextBasedChannels, User } from "discord.js";
import { Message, MessageEmbed } from "discord.js";

class Sender {
    private client: typeof Client;
    private logger: typeof Client.logger;
    private config: typeof Client.config;

    constructor(client: typeof Client) {
        this.client = client;
        this.logger = client.logger;
        this.config = client.config;
    }

    public reply(
        i: (CommandInteraction | ButtonInteraction | SelectMenuInteraction | MessageComponentInteraction),
        payload: InteractionReplyOptions,
        options?: SenderReplyOptions
    ): Promise<void | Message> {
        // No options shortcut
        if (!options) return i.reply(payload);

        // Handle the bot message type
        if (options.msgType) {
            // Cancel message type reply if there is a embed
            if (payload.embeds) throw new Error("the provided embed would be overwritten by the msgType");

            // Create and send the embed
            const embed = new MessageEmbed()
                .setColor(this.config.MSG_TYPES[options.msgType].COLOR)
                .setDescription(`${this.config.MSG_TYPES[options.msgType].EMOJI} **${payload.content}**`);

            delete payload.content;
            payload.embeds = [embed];
        }

        // Fetch the reply if needed for SenderReplyOptions
        if (options.delTime) payload.fetchReply = true;

        // Send the message
        return i[(options.editReply) ? "editReply" : "reply"](payload)
            .then(async msg => {
                // Message delete timeout
                if (options.delTime && msg instanceof Message && msg.deletable) {
                    setTimeout(() => msg.delete().catch(() => {}), options.delTime);
                }
            });

    }

    public send(
        origin: (CommandInteraction | ButtonInteraction | SelectMenuInteraction | MessageComponentInteraction | Message),
        payload: MessageOptions,
        options?: SenderMessageOptions
    ): Promise<void | Message> | void {
        const channel = origin.channel;
        if (channel) return this._sendMsg(channel, payload, options);
    }

    public async msgChannel(
        channel: (TextBasedChannels | Snowflake),
        payload: MessageOptions,
        options?: SenderMessageOptions
    ): Promise<void | Message> {
        const snowflake = `${channel}`.match(/[0-9]+/)?.[0];
        if (snowflake) {
            const fetchedChannel = await this.client.channels.fetch(snowflake).catch(() => { });
            if (fetchedChannel && fetchedChannel.isText()) return this._sendMsg(fetchedChannel, payload, options);
        }
    }

    public async msgUser(user: (User | Snowflake), payload: MessageOptions, options?: SenderMessageOptions): Promise<void | Message> {
        const snowflake = `${user}`.match(/[0-9]+/)?.[0];
        if (snowflake) {
            const fetchedUser = await this.client.users.fetch(snowflake).catch(() => { });
            if (fetchedUser) return this._sendMsg(await fetchedUser.createDM(), payload, options);
        }
    }

    private _sendMsg(channel: TextBasedChannels, payload: (MessageOptions | ReplyMessageOptions), options?: SenderMessageOptions): Promise<void | Message> {
        // No options shortcut
        if (!options) return channel.send(payload);

        // Handle the bot message type
        if (options.msgType) {
            // Cancel message type reply if there is a embed
            if (payload.embeds) throw new Error("the provided embed would be overwritten by the msgType");

            // Create and send the embed
            const embed = new MessageEmbed()
                .setColor(this.config.MSG_TYPES[options.msgType].COLOR)
                .setDescription(`${this.config.MSG_TYPES[options.msgType].EMOJI} **${payload.content}**`);

            delete payload.content;
            payload.embeds = [embed];
        }

        // Send the message
        return channel.send(payload)
            .then(msg => {
                // Message delete timeout
                if (options.delTime) setTimeout(() => msg.delete().catch(() => { }), options.delTime);
            });
    }
}

export default Sender;
