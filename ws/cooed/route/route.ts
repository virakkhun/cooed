import type { RequestHandler } from "../router/index.ts";
import type { IncomingRoute, RouteCtx } from "./index.ts";
import { RouteLogger } from "../logger/route.logger.ts";
import { dynamicPatternLookup } from "./utils/route-look-up.ts";
import { makeRouteKey } from "./utils/route-key.ts";
import { HttpMethod } from "../router/type.ts";

export class Route {
  readonly #routes = new Map<string, RouteCtx<string>>();
  readonly #makeKeyUtil = makeRouteKey();

  public addRoutes<Path extends string = "">(route: RouteCtx<Path>) {
    if (route.path === "*" && route.method !== HttpMethod.Get) {
      throw new Error("* path can not be registered beside GET");
    }

    const routeKey = this.#makeKeyUtil.serialize(route);
    const isPathRegistered = this.#routes.has(routeKey);

    if (isPathRegistered) {
      throw new Error(`${route.path} is already registered!!`);
    }

    this.#routes.set(routeKey, route);
    new RouteLogger({
      method: route.method,
      path: route.path,
      handlers: this._mapHandlerToItsName(route),
    });
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
      const universalHandlers = this._resolveUniversalHandlers();

      return {
        key: route.path,
        handlers: universalHandlers.length
          ? universalHandlers
          : Array.of(this._handlerNotFound),
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

  private _resolveUniversalHandlers() {
    const key = this.#makeKeyUtil.serialize({
      method: HttpMethod.Get,
      path: "*",
    });
    const universalHandlers = this.#routes.get(key);
    return universalHandlers ? universalHandlers.handlers : [];
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
