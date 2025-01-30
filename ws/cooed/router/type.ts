import type { ExtractKeys } from "../common/types/extract-key.ts";

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

export type RequestHandler<Path extends string = ""> = (
  ctx: RequestCtx<Path>,
) => RequestHandlerResponse;

export type RequestBody = {
  json: JSON;
  text: string;
};

export type RequestCtx<Path extends string = ""> = {
  request: Request;
  params: Record<ExtractKeys<Path>, string>;
  query: URLSearchParams;
  json(): Promise<unknown>;
  text(): Promise<string>;
  next: NextFunc;
};

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
