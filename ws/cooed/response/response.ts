import { HttpStatus, MIME_TYPE } from "../constants.ts";

export class CooedResponse {
  private _body: BodyInit = "";
  private _headers: Headers = new Headers();
  private _status: HttpStatus = HttpStatus.Ok;

  constructor() {}

  public get statusCode() {
    return this._status;
  }

  send(statusText?: string): Response {
    return new Response(this._body, {
      status: this._status,
      headers: this._headers,
      statusText,
    });
  }

  text(value: string): CooedResponse {
    this._body = value;
    this._headers.set("Content-Type", MIME_TYPE.plain);
    return this;
  }

  json<T extends unknown>(value: T): CooedResponse {
    this._body = JSON.stringify(value);
    this._headers.set("Content-Type", MIME_TYPE.json);
    return this;
  }

  status(httpStatus: HttpStatus): CooedResponse {
    this._status = httpStatus;
    return this;
  }

  badRequest(): Response {
    return new Response(this._body || "400 bad request", {
      status: HttpStatus.BadRequest,
    });
  }

  unauthorized(): Response {
    return new Response(this._body || "401 unauthorized", {
      status: HttpStatus.Unauthorized,
    });
  }

  forbidden(): Response {
    return new Response(this._body || "403 forbidden", {
      status: HttpStatus.Forbidden,
    });
  }

  notFound(): Response {
    return new Response(this._body || "404 not found", {
      status: HttpStatus.NotFound,
    });
  }

  methodNotAllowed(): Response {
    return new Response(this._body || "405 method not allowed", {
      status: HttpStatus.MethodNotAllowed,
    });
  }

  unsupportedMediaType(): Response {
    return new Response(this._body || "415 unsupported media types", {
      status: HttpStatus.UnsupportedMediaType,
    });
  }

  unprocessableContent(): Response {
    return new Response(this._body || "422 unprocessable content", {
      status: HttpStatus.UnprocessableContent,
    });
  }

  headers(values: Record<string, string>): CooedResponse {
    for (const [key, value] of Object.entries(values)) {
      this._headers.set(key, value);
    }
    return this;
  }
}
