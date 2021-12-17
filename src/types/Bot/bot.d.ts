import { ClientOptions, HexColorString, Snowflake } from "discord.js";

export interface SecretConfig {
    LOG_LEVEL: LogLevel,
    CMD_LOAD_LEVEL: CommandStatus,
    CMD_DEV_GUILD: Snowflake
}

export interface Config {
    COLORS: {
        DEFAULT: HexColorString
    },
    MSG_TYPES: {
        SUCCESS: { EMOJI: string, COLOR: HexColorString },
        INVALID: { EMOJI: string, COLOR: HexColorString },
        ERROR: { EMOJI: string, COLOR: HexColorString },
        TIME: { EMOJI: string, COLOR: HexColorString }
    },
    CLIENT_OPTIONS: ClientOptions,
    VERSION: string
}

export interface SenderMessageOptions {
    delTime?: number;
    msgType?: SenderMessageType;
}

export interface SenderReplyOptions extends SenderMessageOptions {
    editReply?: boolean;
}

export type SenderMessageType =
    | "SUCCESS"
    | "INVALID"
    | "ERROR"
    | "TIME"

export type CommandStatus =
    | "ENABLED"
    | "DISABLED"
    | "DEV"
    | "ALL";

export type LogLevel =
    | "VERBOSE"
    | "DEBUG"
    | "INFO"
    | "WARN"
    | "ERROR";
