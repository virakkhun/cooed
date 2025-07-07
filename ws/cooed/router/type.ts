import type { CooedRequest } from "../request/index.ts";
import type { CooedResponse } from "../response/response.ts";

/**
 * a http verb to define for a request
 * @enum HttpMethod
 * @prop Get "GET"
 * @prop Post "POST"
 * @prop Put "PUT"
 * @prop PATCH "PATCH"
 * @prop Delete "DELETE"
 */
export enum HttpMethod {
  Get = "GET",
  Post = "POST",
  Put = "PUT",
  Patch = "PATCH",
  Delete = "DELETE",
}

/**
 * @type NextFunc
 * a function calling to signal the handler to move to next one
 */
export type NextFunc = () => void;

/**
 * @type ResultCtx
 * a response from the handler which can be a Response or Promise<Response>
 */
export type ResultCtx = Response | Promise<Response>;

/**
 * @type RequestHandlerResponse
 * a request handler response which can be a {@link ResultCtx} or {@link NextFunc}
 */
export type RequestHandlerResponse = ResultCtx | NextFunc;

/**
 * @type RequestHandler
 * to create a request hanlder
 */
export type RequestHandler<Path extends string = ""> = (
  ctx: RequestCtx<Path>,
) => RequestHandlerResponse;

/**
 * @type RequestCtx
 * a request context
 */
export type RequestCtx<Path extends string = ""> = {
  request: CooedRequest<Path>;
  next: NextFunc;
  response: CooedResponse;
};

/**
 * an CooedRouter interface
 * @type CooedRouter
 */
export interface CooedRouter {
  get<Path extends string = "">(
    path: Path,
    ...handlers: RequestHandler<Path>[]
  ): void;
  post<Path extends string = "">(
    path: Path,
    ...handlers: RequestHandler<Path>[]
  ): void;
  put<Path extends string = "">(
    path: Path,
    ...handlers: RequestHandler<Path>[]
  ): void;
  patch<Path extends string = "">(
    path: Path,
    ...handlers: RequestHandler<Path>[]
  ): void;
  delete<Path extends string = "">(
    path: Path,
    ...handlers: RequestHandler<Path>[]
  ): void;
}
