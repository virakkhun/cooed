import type { Route } from "../route/route.ts";
import { RouterGroup } from "./group.ts";
import {
  HttpMethod,
  type IRouter as CooedRouter,
  type RequestHandler,
} from "./type.ts";

export class Router implements CooedRouter {
  constructor(private _route: Route) {}

  get(path: string, ...handlers: RequestHandler[]) {
    this._route.addRoutes({
      method: HttpMethod.Get,
      path,
      handlers,
    });
  }

  post(path: string, ...handlers: RequestHandler[]) {
    this._route.addRoutes({
      method: HttpMethod.Post,
      path,
      handlers,
    });
  }

  patch(path: string, ...handlers: RequestHandler[]) {
    this._route.addRoutes({
      method: HttpMethod.Patch,
      path,
      handlers,
    });
  }

  put(path: string, ...handlers: RequestHandler[]) {
    this._route.addRoutes({
      method: HttpMethod.Update,
      path,
      handlers,
    });
  }

  delete(path: string, ...handlers: RequestHandler[]) {
    this._route.addRoutes({
      method: HttpMethod.Delete,
      path,
      handlers,
    });
  }

  group(prefix: string, middleware?: RequestHandler): CooedRouter {
    const defaultMiddleware: RequestHandler = (_, next) => next;
    return new RouterGroup(prefix, this, middleware || defaultMiddleware);
  }
}
