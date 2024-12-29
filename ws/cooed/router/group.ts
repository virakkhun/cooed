import { truthyFn } from "../util/func.util.ts";
import type { IRouter, RequestHandler, Router } from "./index.ts";

export class RouterGroup implements IRouter {
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
      this._buildPath(path),
      ...this._filterHandler(this._handler, ...handlers),
    );
  }

  delete(path: string, ...handlers: RequestHandler[]): void {
    this._router.delete(
      this._buildPath(path),
      ...this._filterHandler(this._handler, ...handlers),
    );
  }

  patch(path: string, ...handlers: RequestHandler[]): void {
    this._router.patch(
      this._buildPath(path),
      ...this._filterHandler(this._handler, ...handlers),
    );
  }

  put(path: string, ...handlers: RequestHandler[]): void {
    this._router.put(
      this._buildPath(path),
      ...this._filterHandler(this._handler, ...handlers),
    );
  }

  post(path: string, ...handlers: RequestHandler[]): void {
    this._router.post(
      this._buildPath(path),
      ...this._filterHandler(this._handler, ...handlers),
    );
  }

  private _buildPath(path: string) {
    return [this.#prefix, path].join("");
  }

  private _filterHandler(...handlers: RequestHandler[]): RequestHandler[] {
    return handlers.filter(truthyFn);
  }
}
