import moment from "moment";
import type Client from "../index";
import type { LogLevel } from "../types";

class Logger {
    private level: 0 | 1 | 2 | 3 | 4;
    private botLogger: typeof Client.botLogger;

    constructor(client: typeof Client) {
        this.botLogger = client.botLogger;
        this.level = 0;
    }

    public verbose(...message: unknown[]): void {
        if (this.level <= 0) {
            const args = Array.prototype.slice.call(arguments);
            console.log(`[${this._getDateTimeString()}] [VERBOSE]`, args);
        }
    }

    public debug(...message: unknown[]): void {
        if (this.level <= 1) {
            const args = Array.prototype.slice.call(arguments);
            console.debug("\x1b[36m%s\x1b[0m", `[${this._getDateTimeString()}] [DEBUG]`, args);
        }
    }

    public info(...message: unknown[]): void {
        if (this.level <= 2) {
            const args = Array.prototype.slice.call(arguments);
            console.info("\x1b[32m%s\x1b[0m", `[${this._getDateTimeString()}] [INFO]`, args);
        }
    }

    public warn(...message: unknown[]): void {
        if (this.level <= 3) {
            const args = Array.prototype.slice.call(arguments);
            console.warn("\x1b[33m%s\x1b[0m", `[${this._getDateTimeString()}] [WARN]`, args);
        }
    }

    public error(...message: unknown[]): void {
        if (this.level <= 4) {
            const args = Array.prototype.slice.call(arguments);
            console.error("\x1b[31m%s\x1b[0m", `[${this._getDateTimeString()}] [ERROR]`, args);
            if (args.length >= 2) this.botLogger.error(args[0], args[1].stack);
        }
    }

    public setLogLevel(level: LogLevel): void {
        switch (level) {
            case "VERBOSE":
                this.level = 0;
                break;

            case "DEBUG":
                this.level = 1;
                break;

            case "INFO":
                this.level = 2;
                break;

            case "WARN":
                this.level = 3;
                break;

            case "ERROR":
                this.level = 4;
                break;
        }
    }

    private _getDateTimeString(): string {
        return moment.utc().format("YYYY-MM-DD HH:mm:ss");
    }
}

export default Logger;
