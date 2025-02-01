import type { Route } from "../route/index.ts";
import type { ILogger } from "./type.ts";

export class RouteLogger implements ILogger {
  constructor(private _route: Route) {}

  log(): void {
    console.log("\n%c+ Registered route\n", "color:white; font-weight:bold;");
    this._route.getRouteReport.forEach((v) => {
      console.log(
        `method: %c${v.method} \t%cpath: %c${v.path} \t%chandlers: %c${v.handlers}`,
        "color:green;",
        "color:normal;",
        "color:green;",
        "color:normal;",
        "color:green;",
      );
    });
    console.log("");
  }
}
