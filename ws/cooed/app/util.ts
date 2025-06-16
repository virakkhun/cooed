import { nextFn } from "../common/util/func.util.ts";
import { CooedRequest } from "../request/request.ts";
import { CooedResponse } from "../response/response.ts";
import type { RequestCtx } from "../router/index.ts";

/**
 * @description a function to build a params
 * @function buildParams
 * @param keys
 * @param path
 */
export function buildParams(
  path: string,
  keys: string,
): Record<string, string> {
  const values = path.split("/");
  const params = keys
    .split("/")
    .map((v, idx) => (v.includes(":") ? [v.replace(":", ""), values[idx]] : []))
    .filter(([key, value]) => key && value)
    .reduce(
      (prev, [key, value]) => {
        return Object.assign(prev, {
          [key]: value,
        });
      },
      <Record<string, string>>{},
    );

  return params;
}

/**
 * @description a function to build request context
 * @function buildRequestCtx
 * @param req
 * @param indexedPath
 */
export function buildRequestCtx(req: Request, indexedPath: string): RequestCtx {
  return {
    request: new CooedRequest(req, indexedPath),
    next: nextFn,
    response: new CooedResponse(),
  };
}
