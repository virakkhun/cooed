import { Logger } from "../logger/logger.ts";
import { RouteLogger } from "../logger/route.logger.ts";
import type { RequestHandler } from "../router/index.ts";
import type { RouteCtx, IncomingRoute, RouteReport } from "./index.ts";

export class Route {
  readonly #routeReport: RouteReport[] = [];
  readonly #routes = new Map<string, RouteCtx<string & "">>();
  readonly #indexingKeySeperator = "_#_";

  private _makeIndexingKey(route: IncomingRoute) {
    return [route.path, route.method].join(this.#indexingKeySeperator);
  }

  public addRoutes<Path extends string = "">(route: RouteCtx<Path>) {
    const routeKey = this._makeIndexingKey(route);
    const isPathRegistered = this.#routes.has(routeKey);

    if (isPathRegistered) {
      throw new Error(`${route.path} is already registered!!`);
    }

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

  public get getRoutes(): Map<string, RouteCtx> {
    return this.#routes;
  }

  public get getRouteReport(): RouteReport[] {
    return this.#routeReport;
  }

  public resolveHandler(route: IncomingRoute): {
    key: string;
    handlers: RequestHandler[];
  } {
    const resolvedRoute = this._getRoute(route);

    if (!resolvedRoute) return this._resolveHandlerFallback(route);

    if (route.method !== resolvedRoute.method)
      return {
        key: route.path,
        handlers: Array.of(this._handlerNotFound),
      };

    return {
      key: route.path,
      handlers: resolvedRoute.handlers,
    };
  }

  private _resolveHandlerFallback(route: IncomingRoute): {
    key: string;
    handlers: RequestHandler[];
  } {
    const incomingFragment = route.path.split("/");

    const resolvabled = [...this.#routes].find(([key]) => {
      const [pattern, method] = key.split(this.#indexingKeySeperator);
      const fragment = pattern.split("/");

      const isMethodMatching = route.method === method;

      const isFragmentMatchingLength =
        incomingFragment.length === fragment.length;
      return isMethodMatching && isFragmentMatchingLength;
    });

    if (!resolvabled)
      return {
        key: route.path,
        handlers: Array.of(this._handlerNotFound),
      };

    const [indexingKey, ctx] = resolvabled;
    const [key] = indexingKey.split(this.#indexingKeySeperator);

    return {
      key,
      handlers: ctx.handlers,
    };
  }

  public get routes(): Map<string, RouteCtx> {
    return this.#routes;
  }

  private _getRoute(route: IncomingRoute) {
    const routeKey = this._makeIndexingKey(route);
    return this.#routes.get(routeKey);
  }

  private get _handlerNotFound(): RequestHandler {
    return (ctx) =>
      new Response(`${ctx.request.url} not found. 404`, {
        status: 404,
      });
  }

  private _mapHandlerToItsName<P extends string>(route: RouteCtx<P>) {
    return route.handlers
      .map((func) => (!func.name ? "anonymous function" : func.name))
      .join(", ");
  }
}
