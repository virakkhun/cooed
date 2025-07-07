import { truthyFn } from "../common/util/func.util.ts";
import type { CooedRouter, RequestHandler, Router } from "./index.ts";

/**
 * a class to create a router group
 */
export class RouterGroup implements CooedRouter {
  #prefix: string;

  /**
   * @param prefix a group prefix
   * @param _router a router instance {@link Router}
   * @param _handler a middlware handler
   */
  constructor(
    prefix: string,
    private _router: Router,
    private _handler: RequestHandler,
  ) {
    this.#prefix = prefix;
  }

  /**
   * define a route with method get and a series of request handlers
   * @param handlers a series of request handlers
   * @param path a string to defined a route
   */
  get<Path extends string>(
    path: Path,
    ...handlers: RequestHandler<Path>[]
  ): void {
    this._router.get(
      this._joinPath(path),
      ...this._filterHandler<Path>(this._handler, ...handlers),
    );
  }

  /**
   * define a route with method delete and a series of request handlers
   * @param handlers a series of request handlers
   * @param path a string to defined a route
   */
  delete<Path extends string>(
    path: Path,
    ...handlers: RequestHandler<Path>[]
  ): void {
    this._router.delete(
      this._joinPath(path),
      ...this._filterHandler<Path>(this._handler, ...handlers),
    );
  }

  /**
   * define a route with method patch and a series of request handlers
   * @param handlers a series of request handlers
   * @param path a string to defined a route
   */
  patch<Path extends string>(
    path: Path,
    ...handlers: RequestHandler<Path>[]
  ): void {
    this._router.patch(
      this._joinPath(path),
      ...this._filterHandler<Path>(this._handler, ...handlers),
    );
  }

  /**
   * define a route with method put and a series of request handlers
   * @param handlers a series of request handlers
   * @param path a string to defined a route
   */
  put<Path extends string>(
    path: Path,
    ...handlers: RequestHandler<Path>[]
  ): void {
    this._router.put(
      this._joinPath(path),
      ...this._filterHandler<Path>(this._handler, ...handlers),
    );
  }

  /**
   * define a route with method post and a series of request handlers
   * @param handlers a series of request handlers
   * @param path a string to defined a route
   */
  post<Path extends string>(
    path: Path,
    ...handlers: RequestHandler<Path>[]
  ): void {
    this._router.post(
      this._joinPath(path),
      ...this._filterHandler<Path>(this._handler, ...handlers),
    );
  }

  private _joinPath(path: string) {
    if (path === "/") return this.#prefix;
    return [this.#prefix, path].join("");
  }

  private _filterHandler<Path extends string = "">(
    ...handlers: RequestHandler<Path>[]
  ): RequestHandler<Path>[] {
    return handlers.filter(truthyFn);
  }
}
