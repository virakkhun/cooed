import { Logger } from "../logger/logger.ts";
import { RouteLogger } from "../logger/route.logger.ts";
import { RequestHandler } from "../router/type.ts";
import { RouteCtx, RouteKey, RouteReport } from "./type.ts";

export class Route {
  #routeReport: RouteReport[] = [];
  #routes = new Map<string, RouteCtx>();

  private _createRouteKey(route: RouteKey) {
    return [route.path, route.method].join("_");
  }

  public addRoutes(route: RouteCtx) {
    const routeKey = this._createRouteKey(route);
    const isPathRegistered = this.#routes.has(routeKey);

    if (isPathRegistered)
      throw new Error(`${route.path} is already registered!!`);

    this.#routeReport.push({
      method: route.method,
      path: route.path,
      handlers: this._mapHandlerToItsName(route),
    });
    this.#routes.set(routeKey, route);
  }

  public report() {
    new Logger(new RouteLogger(this));
  }

  public get getRoutes() {
    return this.#routes;
  }

  public get getRouteReport() {
    return this.#routeReport;
  }

  public resolveHandler(route: RouteKey): RequestHandler[] {
    const resolvedRoute = this._getRoute(route);

    if (!resolvedRoute) return Array.of(this._handlerNotFound);

    if (route.method !== resolvedRoute.method)
      return Array.of(this._handlerNotFound);

    return resolvedRoute.handlers;
  }

  public get routes() {
    return this.#routes;
  }

  private _getRoute(route: RouteKey) {
    const routeKey = this._createRouteKey(route);
    return this.#routes.get(routeKey);
  }

  private get _handlerNotFound(): RequestHandler {
    return (request: Request) =>
      new Response(`${request.url} not found. 404`, {
        status: 404,
      });
  }

  private _mapHandlerToItsName(route: RouteCtx) {
    return route.handlers
      .map((func) => (!func.name ? "anonymous function" : func.name))
      .join(", ");
  }
}
