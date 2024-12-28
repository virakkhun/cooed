import { ILogger } from "./type.ts";

type RequestLoggerDTO = {
  method: string;
  pathname: string;
  status: number;
};

export class RequestLogger implements ILogger {
  constructor(public dto: RequestLoggerDTO) {}

  log(): void {
    const { pathname, method, status } = this.dto;
    const template = `%c>>>> %cpath: ${pathname} | method: ${method} | status: ${status} | %ctimestamp: %c${this._isoTime}`;
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
