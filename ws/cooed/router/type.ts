export enum HttpMethod {
  Get = "GET",
  Post = "POST",
  Update = "UPDATE",
  Patch = "PATCH",
  Delete = "DELETE",
}

export type NextFunc = () => void;
export type ResultCtx = Response | Promise<Response>;
export type RequestHandlerResponse = ResultCtx | NextFunc;

export type RequestHandler = (
  request: Request,
  next: NextFunc,
) => RequestHandlerResponse;

export interface IRouter {
  get(path: string, ...handlers: RequestHandler[]): void;
  post(path: string, ...handlers: RequestHandler[]): void;
  put(path: string, ...handlers: RequestHandler[]): void;
  patch(path: string, ...handlers: RequestHandler[]): void;
  delete(path: string, ...handlers: RequestHandler[]): void;
}
