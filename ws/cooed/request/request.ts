import { buildParams } from "../app/util.ts";
import type { ExtractKeys } from "../common/types/extract-key.ts";

export class CooedRequest<Path extends string = ""> {
  constructor(
    private _req: Request,
    private _indexPath: string,
  ) {}

  get raw(): Request {
    return this._req;
  }

  get host(): string {
    return this._url.host;
  }

  get origin(): string {
    return this._url.origin;
  }

  get port(): string {
    return this._url.port;
  }

  get protocol(): string {
    return this._url.protocol;
  }

  get href(): string {
    return this._url.href;
  }

  get path(): string {
    return this._url.pathname;
  }

  get query(): URLSearchParams {
    return this._url.searchParams;
  }

  get params(): Record<ExtractKeys<Path>, string> {
    const params = buildParams(this.path, this._indexPath);
    return params;
  }

  json<T extends unknown = unknown>(): Promise<T> {
    return this._req.json();
  }

  text(): Promise<string> {
    return this._req.text();
  }

  formData(): Promise<FormData> {
    return this._req.formData();
  }

  blob(): Promise<Blob> {
    return this._req.blob();
  }

  private get _url() {
    return new URL(this._req.url);
  }
}
