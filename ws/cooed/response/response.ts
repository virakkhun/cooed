import { HttpStatus, MIME_TYPE } from "../constants.ts";

export class CooedResponse {
  private _body: BodyInit = "";
  private _headers: Headers = new Headers();
  private _status: HttpStatus = HttpStatus.Ok;

  constructor() {}

  send(statusText?: string): Response {
    return new Response(this._body, {
      status: this._status,
      headers: this._headers,
      statusText,
    });
  }

  text(value: string) {
    this._body = value;
    return this;
  }

  json<T extends unknown>(value: T) {
    this._body = JSON.stringify(value);
    this._headers.set("Content-Type", MIME_TYPE.json);
    return this;
  }

  status(httpStatus: HttpStatus) {
    this._status = httpStatus;
    return this;
  }

  badRequest() {
    return new Response(this._body || "400 bad request", {
      status: HttpStatus.BadRequest,
    });
  }

  unauthorized() {
    return new Response(this._body || "401 unauthorized", {
      status: HttpStatus.Unauthorized,
    });
  }

  forbidden() {
    return new Response(this._body || "403 forbidden", {
      status: HttpStatus.Unauthorized,
    });
  }

  notFound() {
    return new Response(this._body || "404 not found", {
      status: HttpStatus.NotFound,
    });
  }

  methodNotAllowed() {
    return new Response(this._body || "405 method not allowed", {
      status: HttpStatus.MethodNotAllowed,
    });
  }

  unsupportedMediaType() {
    return new Response(this._body || "415 method not allowed", {
      status: HttpStatus.UnsupportedMediaType,
    });
  }

  unprocessableContent() {
    return new Response(this._body || "422 unprocessable content", {
      status: HttpStatus.UnprocessableContent,
    });
  }

  headers(values: Record<string, string>) {
    for (const [key, value] of Object.entries(values))
      this._headers.set(key, value);
    return this;
  }
}
