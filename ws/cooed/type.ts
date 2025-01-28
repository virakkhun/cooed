import type { Static } from "./app/static.ts";

export type ServerConfig = {
  static?: Static<string>;
};
