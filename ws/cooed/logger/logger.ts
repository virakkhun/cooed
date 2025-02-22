import type { RequestCtx } from "../router/index.ts";
import type { ILogger } from "./type.ts";

export class Logger {
  constructor(private _req: Readonly<RequestCtx>) {}

  of(logger: ILogger) {
    logger.log(this._req);
  }
}
