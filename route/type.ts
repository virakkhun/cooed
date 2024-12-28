import { HttpMethod, RequestHandler } from "../router/type.ts";

export type RouteKey = {
  path: string;
  method: HttpMethod;
};

export type RouteCtx = {
  handlers: RequestHandler[];
} & RouteKey;

export type RouteReport = {
  handlers: string;
} & RouteKey;
