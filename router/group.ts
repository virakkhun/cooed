import { IRouter, RequestHandler } from "./type.ts";
import { Router } from "./router.ts";

export class RouterGroup implements IRouter {
  #prefix: string;

  constructor(
    prefix: string,
    private _router: Router,
  ) {
    this.#prefix = prefix;
  }

  get(path: string, ...handlers: RequestHandler[]): void {
    this._router.get(this._buildPath(path), ...handlers);
  }

  delete(path: string, ...handlers: RequestHandler[]): void {
    this._router.delete(this._buildPath(path), ...handlers);
  }

  patch(path: string, ...handlers: RequestHandler[]): void {
    this._router.patch(this._buildPath(path), ...handlers);
  }

  put(path: string, ...handlers: RequestHandler[]): void {
    this._router.put(this._buildPath(path), ...handlers);
  }

  post(path: string, ...handlers: RequestHandler[]): void {
    this._router.post(this._buildPath(path), ...handlers);
  }

  private _buildPath(path: string) {
    return [this.#prefix, path].join("");
  }
}
