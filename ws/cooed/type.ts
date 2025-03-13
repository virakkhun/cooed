import type { Cors } from "./app/cors.ts";
import type { Static } from "./app/static.ts";
import type { ILogger } from "./logger/type.ts";

export type ServerConfig = {
  static?: Static<string>;
  logger?: ILogger;
  cors?: Cors;
};
