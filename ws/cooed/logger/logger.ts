import type { ILogger } from "./type.ts";

export class Logger {
  constructor(private _logger: ILogger) {
    this._logger.log();
  }
}
