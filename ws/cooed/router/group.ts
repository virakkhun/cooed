import { truthyFn } from "../util/func.util.ts";
import type { CooedRouter, RequestHandler, Router } from "./index.ts";

export class RouterGroup implements CooedRouter {
  #prefix: string;

  constructor(
    prefix: string,
    private _router: Router,
    private _handler: RequestHandler,
  ) {
    this.#prefix = prefix;
  }

  get(path: string, ...handlers: RequestHandler[]): void {
    this._router.get(
      this._joinPath(path),
      ...this._filterHandler(this._handler, ...handlers),
    );
  }

  delete(path: string, ...handlers: RequestHandler[]): void {
    this._router.delete(
      this._joinPath(path),
      ...this._filterHandler(this._handler, ...handlers),
    );
  }

  patch(path: string, ...handlers: RequestHandler[]): void {
    this._router.patch(
      this._joinPath(path),
      ...this._filterHandler(this._handler, ...handlers),
    );
  }

  put(path: string, ...handlers: RequestHandler[]): void {
    this._router.put(
      this._joinPath(path),
      ...this._filterHandler(this._handler, ...handlers),
    );
  }

  post(path: string, ...handlers: RequestHandler[]): void {
    this._router.post(
      this._joinPath(path),
      ...this._filterHandler(this._handler, ...handlers),
    );
  }

  private _joinPath(path: string) {
    if (path === "/") return this.#prefix;
    return [this.#prefix, path].join("");
  }

  private _filterHandler(...handlers: RequestHandler[]): RequestHandler[] {
    return handlers.filter(truthyFn);
  }
}
