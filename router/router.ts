import { Route } from "../route/route.ts";
import { RouterGroup } from "./group.ts";
import { HttpMethod, IRouter, RequestHandler } from "./type.ts";

export class Router implements IRouter {
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

  group(prefix: string): IRouter {
    return new RouterGroup(prefix, this);
  }
}
