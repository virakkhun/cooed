import type { Route } from "../route/route.ts";
import { RouterGroup } from "./group.ts";
import { type CooedRouter, HttpMethod, type RequestHandler } from "./type.ts";

export class Router implements CooedRouter {
  constructor(private _route: Route) {}

  get<Path extends string>(path: Path, ...handlers: RequestHandler<Path>[]) {
    this._route.addRoutes<Path>({
      method: HttpMethod.Get,
      path,
      handlers,
    });
  }

  post<Path extends string>(path: Path, ...handlers: RequestHandler<Path>[]) {
    this._route.addRoutes({
      method: HttpMethod.Post,
      path,
      handlers,
    });
  }

  patch<Path extends string>(path: Path, ...handlers: RequestHandler<Path>[]) {
    this._route.addRoutes({
      method: HttpMethod.Patch,
      path,
      handlers,
    });
  }

  put<Path extends string>(path: Path, ...handlers: RequestHandler<Path>[]) {
    this._route.addRoutes({
      method: HttpMethod.Update,
      path,
      handlers,
    });
  }

  delete<Path extends string>(path: Path, ...handlers: RequestHandler<Path>[]) {
    this._route.addRoutes({
      method: HttpMethod.Delete,
      path,
      handlers,
    });
  }

  group(prefix: string, middleware?: RequestHandler): CooedRouter {
    const defaultMiddleware: RequestHandler = (ctx) => ctx.next;
    return new RouterGroup(prefix, this, middleware || defaultMiddleware);
  }
}
