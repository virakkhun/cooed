import type { Route } from "../route/route.ts";
import { RouterGroup } from "./group.ts";
import { type CooedRouter, HttpMethod, type RequestHandler } from "./type.ts";

/**
 * @class Router
 * @extends CooedRouter
 * @description a class represent of Router, contains get, post, patch, put, delete, and group
 */
export class Router implements CooedRouter {
  constructor(private _route: Route) {}

  /**
   * define a route with method get and a series of request handlers
   * @param handlers a series of request handlers
   * @param path a string to defined a route
   */
  get<Path extends string>(path: Path, ...handlers: RequestHandler<Path>[]) {
    this._route.addRoutes<Path>({
      method: HttpMethod.Get,
      path,
      handlers,
    });
  }

  /**
   * define a route with method post and a series of request handlers
   * @param handlers a series of request handlers
   * @param path a string to defined a route
   */
  post<Path extends string>(path: Path, ...handlers: RequestHandler<Path>[]) {
    this._route.addRoutes({
      method: HttpMethod.Post,
      path,
      handlers,
    });
  }

  /**
   * define a route with method patch and a series of request handlers
   * @param handlers a series of request handlers
   * @param path a string to defined a route
   */
  patch<Path extends string>(path: Path, ...handlers: RequestHandler<Path>[]) {
    this._route.addRoutes({
      method: HttpMethod.Patch,
      path,
      handlers,
    });
  }

  /**
   * define a route with method put and a series of request handlers
   * @param handlers a series of request handlers
   * @param path a string to defined a route
   */
  put<Path extends string>(path: Path, ...handlers: RequestHandler<Path>[]) {
    this._route.addRoutes({
      method: HttpMethod.Put,
      path,
      handlers,
    });
  }

  /**
   * define a route with method put and a series of request handlers
   * @param handlers a series of request handlers
   * @param path a string to defined a route
   */
  delete<Path extends string>(path: Path, ...handlers: RequestHandler<Path>[]) {
    this._route.addRoutes({
      method: HttpMethod.Delete,
      path,
      handlers,
    });
  }

  /**
   * define a group route with its prefix
   * @param prefix group route prefix
   * @param middleware an optional middleware
   */
  group(prefix: string, middleware?: RequestHandler): CooedRouter {
    const defaultMiddleware: RequestHandler = (ctx) => ctx.next;
    return new RouterGroup(prefix, this, middleware || defaultMiddleware);
  }
}
