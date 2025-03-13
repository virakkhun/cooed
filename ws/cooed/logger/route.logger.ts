import type { RouteReport } from "../route/type.ts";

export class RouteLogger {
  constructor(private _routeReport: RouteReport) {
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
