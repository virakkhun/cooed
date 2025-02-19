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

/**
 * @class CooedServer
 * @description a main entry to create a server and serve http request
 * @returns {CooedRouter} CooedRouter
 *
 * @example
 *
 * a simple api server
 * ```ts
 * const app = new CooedServer()
 *
 * // define endpoints
 * app.get('/', (ctx) => ctx.text('Hello world'))
 *
 * // define grouping route
 * const grouping = app.group('/group')
 *
 * grouping.get('/', ctx => ctx.response.text('This is a group route'))
 *
 * // define route with params
 * grouping.get('/dev/:devId', ctx => ctx.response.json(ctx.request.params.devId))
 *
 * // with Deno
 * Deno.serve(app.serve)
 * ```
 * @public
 */
export class CooedServer implements CooedRouter {
  private _route: Route = new Route();
  private _router: Router = new Router(this._route);
  private _static: Static<string> | undefined = undefined;

  constructor(private _config?: ServerConfig) {
    this._initialStatic();
    this._labelingAPIRoutes();
  }

  private _labelingAPIRoutes() {
    console.log("\n%c+ API\n", "color:white; font-weight:bold;");
  }

  private _initialStatic() {
    if (this._config?.static) {
      this._static = this._config.static;
      this._static.report();
    }
  }

  /**
   * @method get
   * @description define a route with `GET` method
   * @example
   * ```ts
   * app.get('/hello', ctx => ctx.response.text('World'))
   * ```
   * @public
   */
  get<Path extends string>(path: Path, ...handlers: RequestHandler<Path>[]) {
    this._router.get<Path>(path, ...handlers);
  }

  /**
   * @method post
   * @description define a route with `POST` method
   * @example
   * ```ts
   * app.post('/hello', async ctx => await ctx.response.text(await ctx.request.text()))
   * ```
   * @public
   */
  post<Path extends string>(path: Path, ...handlers: RequestHandler<Path>[]) {
    this._router.post(path, ...handlers);
  }

  /**
   * @method patch
   * @description define a route with `PATCH` method
   * @example
   * ```ts
   * app.patch('/hello/:id', async ctx => {
   *  const id = ctx.request.params.id
   *  const body = await ctx.request.json()
   *  const query = await db.hello.patch(id, {...body})
   *
   *  if(!query.result.ok) return ctx.response.badRequest()
   *
   *  return ctx.response.status(200).send()
   * })
   * ```
   * @public
   */
  patch<Path extends string>(path: Path, ...handlers: RequestHandler<Path>[]) {
    this._router.patch(path, ...handlers);
  }

  /**
   * @method put
   * @description define a route with `PUT` method
   * @example
   * ```ts
   * app.put('/hello/:id', async ctx => {
   *  const id = ctx.request.params.id
   *  const body = await ctx.request.text()
   *  await db.hello.put(id, body)
   *  // expected result ok
   *  return ctx.response.status(200).send()
   * })
   * ```
   * @public
   */
  put<Path extends string>(path: Path, ...handlers: RequestHandler<Path>[]) {
    this._router.put(path, ...handlers);
  }

  /**
   * @method delete
   * @description define a route with 'DELETE' method
   * ```ts
   * app.delete('/hello/:id', async ctx => {
   *  await db.helllo.delete(ctx.request.params.id)
   *  return ctx.response.status(200).send()
   * })
   * ```
   * @public
   */
  delete<Path extends string>(path: Path, ...handlers: RequestHandler<Path>[]) {
    this._router.delete(path, ...handlers);
  }

  /**
   * @method group
   * @description grouping a route with prefix
   * ```ts
   * const world = app.group('/world')
   *
   * world.get('/', _ => new Response('/group/ Hello world'))
   * ```
   * @returns {CooedRouter}
   *
   * @public
   */
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
      const isNextInstanceOfResponse = next instanceof Response ||
        next instanceof Promise;
      if (isNextInstanceOfResponse) {
        response = next;
        break;
      } else continue;
    }

    return response;
  }

  /**
   * @method serve
   * @description call serve to handle request
   *
   * @public
   */
  public async serve(req: Request): Promise<Response> {
    const { pathname } = new URL(req.url);

    if (this._static) {
      const res = await this._static.resolve(pathname);
      if (res) return res;
    }

    const method = <HttpMethod> req.method;
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
