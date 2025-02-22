import type { RequestCtx } from "../router/type.ts";

export interface ILogger {
  log(req: Readonly<RequestCtx>): void;
}
