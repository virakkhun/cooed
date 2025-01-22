import type { Merge } from "../common/types/merge.ts";
import type { HttpMethod, RequestHandler } from "../router/index.ts";

export type IncomingRoute = {
  path: string;
  method: HttpMethod;
};

export type RouteCtx<Path extends string = ""> = Merge<
  {
    handlers: RequestHandler<Path>[];
  },
  IncomingRoute
>;

export type RouteReport = Merge<
  {
    handlers: string;
  },
  IncomingRoute
>;
