import { Logger } from "../logger/logger.ts";
import { RouteLogger } from "../logger/route.logger.ts";
import type { RequestHandler } from "../router/index.ts";
import type { IncomingRoute, RouteCtx } from "./index.ts";
import { dynamicPatternLookup } from "./utils/route-look-up.ts";
import { makeRouteKey } from "./utils/route-key.ts";

export class Route {
  readonly #routes = new Map<string, RouteCtx<string>>();
  readonly #makeKeyUtil = makeRouteKey();

  public addRoutes<Path extends string = "">(route: RouteCtx<Path>) {
    const routeKey = this.#makeKeyUtil.serialize(route);
    const isPathRegistered = this.#routes.has(routeKey);

    if (isPathRegistered) {
      throw new Error(`${route.path} is already registered!!`);
    }

    new Logger(
      new RouteLogger({
        method: route.method,
        path: route.path,
        handlers: this._mapHandlerToItsName(route),
      }),
    );
    this.#routes.set(routeKey, route);
  }

  public resolveHandler(route: IncomingRoute): {
    key: string;
    handlers: RequestHandler[];
  } {
    const resolvedRoute = this._getRoute(route);

    if (!resolvedRoute) return this._resolveHandlerFallback(route);

    if (route.method !== resolvedRoute.method) {
      return {
        key: route.path,
        handlers: Array.of(this._handlerNotFound),
      };
    }

    return {
      key: route.path,
      handlers: resolvedRoute.handlers,
    };
  }

  private _resolveHandlerFallback(route: IncomingRoute): {
    key: string;
    handlers: RequestHandler[];
  } {
    const resolvedPattern = dynamicPatternLookup(route.path, [
      ...this.routes.keys(),
    ]);

    if (!resolvedPattern) {
      return {
        key: route.path,
        handlers: Array.of(this._handlerNotFound),
      };
    }

    const handlers = this.#routes.get(resolvedPattern);

    if (!handlers) {
      return {
        key: route.path,
        handlers: Array.of(this._handlerNotFound),
      };
    }

    return {
      key: this.#makeKeyUtil.deSerialize(resolvedPattern),
      handlers: handlers.handlers,
    };
  }

  public get routes(): Map<string, RouteCtx> {
    return this.#routes;
  }

  private _getRoute(route: IncomingRoute) {
    const routeKey = this.#makeKeyUtil.serialize(route);
    return this.#routes.get(routeKey);
  }

  private get _handlerNotFound(): RequestHandler {
    return (ctx) =>
      new Response(`${ctx.request.path} not found. 404`, {
        status: 404,
      });
  }

  private _mapHandlerToItsName<P extends string>(route: RouteCtx<P>) {
    return route.handlers
      .map((func) => (!func.name ? "anonymous function" : func.name))
      .join(", ");
  }
}
