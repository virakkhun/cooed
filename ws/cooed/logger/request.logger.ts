import type { RequestCtx } from "../router/type.ts";
import type { ILogger } from "./type.ts";

export class RequestLogger implements ILogger {
  constructor() {}

  log(ctx: Readonly<RequestCtx>): void {
    const { request, response } = ctx;
    const template = `%c>>>> %cpath: ${request.path} | method: ${request.method} | status: ${response.statusCode} | %ctimestamp: %c${this._isoTime}`;
    const format = [
      "color:yellow;",
      "color:green;",
      "color:red;",
      "color:blue",
    ];
    console.log(template, ...format);
  }

  private get _isoTime() {
    return new Date().toISOString();
  }
}
