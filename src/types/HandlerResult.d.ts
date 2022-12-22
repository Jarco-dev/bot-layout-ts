export type HandlerResult =
    | {
          result:
              | "SUCCESS"
              | "USER_MISSING_PERMISSIONS"
              | "DISALLOWED_CHANNEL_OR_GUILD"
              | "OTHER";
          note?: string;
      }
    | {
          result: "ERRORED";
          note: string;
          error: Error;
      };
