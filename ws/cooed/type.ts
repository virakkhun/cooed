import type { Cors } from "./app/cors.ts";
import type { ILogger } from "./logger/type.ts";

export type ServerConfig = {
  logger?: ILogger;
  cors?: Cors;
};
