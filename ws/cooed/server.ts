import { Logger } from "./logger/logger.ts";
import { RequestLogger } from "./logger/request.logger.ts";
import { Route } from "./route/route.ts";
import type { IRouter } from "./router/index.ts";
import { Router } from "./router/router.ts";
import type { HttpMethod, NextFunc, RequestHandler } from "./router/type.ts";

export class Server {
  private _route: Route = new Route();
  private _router: Router = new Router(this._route);

  constructor() {}

  get(path: string, ...handlers: RequestHandler[]) {
    this._router.get(path, ...handlers);
  }

  post(path: string, ...handlers: RequestHandler[]) {
    this._router.post(path, ...handlers);
  }

  patch(path: string, ...handlers: RequestHandler[]) {
    this._router.patch(path, ...handlers);
  }

  put(path: string, ...handlers: RequestHandler[]) {
    this._router.put(path, ...handlers);
  }

  delete(path: string, ...handlers: RequestHandler[]) {
    this._router.delete(path, ...handlers);
  }

  group(prefix: string): IRouter {
    return this._router.group(prefix);
  }

  private _nextFunc: NextFunc = () => {};

  private _getResponse(
    handlers: RequestHandler[],
    request: Request,
  ): Response | Promise<Response> {
    let response: Response | Promise<Response> = new Response(null);

    for (const handler of handlers) {
      const next = handler(request, this._nextFunc);
      const isNextInstanceOfResponse =
        next instanceof Response || next instanceof Promise;
      if (isNextInstanceOfResponse) {
        response = next;
        break;
      } else continue;
    }

    return response;
  }

  public report() {
    this._route.report();
  }

  public async serve(req: Request): Promise<Response> {
    const { pathname } = new URL(req.url);
    const method = <HttpMethod>req.method;
    const handlers = this._route.resolveHandler({
      path: pathname,
      method,
    });
    const response = this._getResponse(handlers, req);

    if (response instanceof Promise) {
      const res = await response;

      new Logger(new RequestLogger({ pathname, method, status: res.status }));
      return res;
    }

    new Logger(
      new RequestLogger({ pathname, method, status: response.status }),
    );
    return response;
  }
}
