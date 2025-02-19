import type { RouteReport } from "../route/type.ts";
import type { ILogger } from "./type.ts";

export class RouteLogger implements ILogger {
  constructor(private _routeReport: RouteReport) {}

  log(): void {
    const { method, path, handlers } = this._routeReport;
    console.log(
      `method: %c${method} \t%cpath: %c${path} \t%chandlers: %c${handlers}`,
      "color:green;",
      "color:normal;",
      "color:green;",
      "color:normal;",
      "color:green;",
    );
  }
}
