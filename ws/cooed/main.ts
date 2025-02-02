import { Logger } from "./logger/logger.ts";
import { RequestLogger } from "./logger/request.logger.ts";
import { Route } from "./route/route.ts";
import { Router } from "./router/router.ts";
import type {
  CooedRouter,
  HttpMethod,
  RequestCtx,
  RequestHandler,
} from "./router/type.ts";
import type { ServerConfig } from "./type.ts";
import type { Static } from "./app/static.ts";
import { buildRequestCtx } from "./app/util.ts";

export class CooedServer implements CooedRouter {
  private _route: Route = new Route();
  private _router: Router = new Router(this._route);
  private _static: Static<string> | undefined = undefined;

  constructor(private _config?: ServerConfig) {
    if (!this._config) return;
    this._initialStatic();
  }

  private _initialStatic() {
    if (this._config?.static) {
      this._static = this._config.static;
      this._static.report();
    }
  }

  get<Path extends string>(path: Path, ...handlers: RequestHandler<Path>[]) {
    this._router.get<Path>(path, ...handlers);
  }

  post<Path extends string>(path: Path, ...handlers: RequestHandler<Path>[]) {
    this._router.post(path, ...handlers);
  }

  patch<Path extends string>(path: Path, ...handlers: RequestHandler<Path>[]) {
    this._router.patch(path, ...handlers);
  }

  put<Path extends string>(path: Path, ...handlers: RequestHandler<Path>[]) {
    this._router.put(path, ...handlers);
  }

  delete<Path extends string>(path: Path, ...handlers: RequestHandler<Path>[]) {
    this._router.delete(path, ...handlers);
  }

  group(prefix: string, middleware?: RequestHandler): CooedRouter {
    return this._router.group(prefix, middleware);
  }

  private _getResponse(
    handlers: RequestHandler[],
    ctx: RequestCtx,
  ): Response | Promise<Response> {
    let response: Response | Promise<Response> = new Response(null);

    for (const handler of handlers) {
      const next = handler(ctx);
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

    if (this._static) {
      const res = await this._static.resolve(pathname);
      if (res) return res;
    }

    const method = <HttpMethod>req.method;
    const { key, handlers } = this._route.resolveHandler({
      path: pathname,
      method,
    });
    const ctx: RequestCtx = buildRequestCtx(req, key);
    const response = this._getResponse(handlers, ctx);

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
