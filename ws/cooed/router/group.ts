import { truthyFn } from "../common/util/func.util.ts";
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

  get<Path extends string>(
    path: Path,
    ...handlers: RequestHandler<Path>[]
  ): void {
    this._router.get(
      this._joinPath(path),
      ...this._filterHandler<Path>(this._handler, ...handlers),
    );
  }

  delete<Path extends string>(
    path: Path,
    ...handlers: RequestHandler<Path>[]
  ): void {
    this._router.delete(
      this._joinPath(path),
      ...this._filterHandler<Path>(this._handler, ...handlers),
    );
  }

  patch<Path extends string>(
    path: Path,
    ...handlers: RequestHandler<Path>[]
  ): void {
    this._router.patch(
      this._joinPath(path),
      ...this._filterHandler<Path>(this._handler, ...handlers),
    );
  }

  put<Path extends string>(
    path: Path,
    ...handlers: RequestHandler<Path>[]
  ): void {
    this._router.put(
      this._joinPath(path),
      ...this._filterHandler<Path>(this._handler, ...handlers),
    );
  }

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
