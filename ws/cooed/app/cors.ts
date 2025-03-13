import { HttpMethod } from "../router/index.ts";

export type CorsConfig = {
  /**
   * specify the headers to be allowed
   * @default undefined
   */
  allowedHeaders?: string[];
  /**
   * specify method to be allowed
   * @property method
   * @default ['GET', 'POST', 'PATCH', 'PUT', 'DELETE']
   */
  method?: HttpMethod[];
  /**
   * specify origin to be allowed to communicate
   * @property origin
   * @default *
   */
  origin?: string[];
};

const CORS_HEADERS = [
  "Access-Control-Allow-Origin",
  "Access-Control-Request-Method",
  "Access-Control-Request-Headers",
] as const;

/**
 * @class Cors
 * @description enable cors in application server
 * @public
 */
export class Cors {
  private _headers: Headers = new Headers();

  constructor(private _config: CorsConfig) {
    this._buildHeaders();
  }

  private _buildHeaders() {
    if (!this._config) return;

    for (const header of CORS_HEADERS) {
      if (this._configToHeadersMap[header])
        this._headers.set(header, this._configToHeadersMap[header]);
    }
  }

  public getHeaders() {
    return this._headers;
  }

  private get _configToHeadersMap(): Record<
    (typeof CORS_HEADERS)[number],
    string
  > {
    return {
      "Access-Control-Allow-Origin": this._config?.origin
        ? this._config.origin.join(", ")
        : "*",
      "Access-Control-Request-Headers": this._config?.allowedHeaders
        ? this._config.allowedHeaders.join(", ")
        : "",
      "Access-Control-Request-Method":
        this._config?.method?.join(", ") ??
        [
          HttpMethod.Get,
          HttpMethod.Post,
          HttpMethod.Patch,
          HttpMethod.Put,
          HttpMethod.Delete,
        ].join(", "),
    };
  }
}
