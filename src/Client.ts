import { PrismaClient } from "@prisma/client";
import { Client as DiscordClient } from "discord.js";
import CommandLoader from "./commands/CommandLoader";
import config from "./config";
import EventLoader from "./events/EventLoader";
import FeatureLoader from "./features/FeatureLoader";
import type { SecretConfig } from "./types";
import Global from "./utils/Global";
import Logger from "./utils/Logger";
import Sender from "./utils/Sender";

class Client extends DiscordClient {
    public sConfig = require("../secret/config") as SecretConfig;
    public config = config;
    public logger = new Logger();
    public prisma = new PrismaClient();
    public sender = new Sender();
    public global = new Global();
    public commandLoader = new CommandLoader();
    public eventLoader = new EventLoader();
    public featureLoader = new FeatureLoader();

    constructor() {
        super(config.CLIENT_OPTIONS);

        // Logging
        this.logger.setLogLevel(this.sConfig.LOG_LEVEL);

        // Database
        this.prisma.$connect().catch((err: unknown) => this.logger.error("Error while connecting to database", err));

        // Loaders
        this.commandLoader.loadAll();
        this.eventLoader.loadAll();
        this.featureLoader.loadAll();
    }
}

export default Client;
