import Client from "../../index";

class Base {
    protected client = Client;
    protected prisma = Client.prisma;
    protected sConfig = Client.sConfig;
    protected config = Client.config;
    protected logger = Client.logger;
    protected sender = Client.sender;
    protected global = Client.global;
}

export default Base;
