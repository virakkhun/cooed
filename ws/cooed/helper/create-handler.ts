import type { RequestHandler } from "../router/type.ts";

/**
 * @function createHandler
 * @param handler
 * @description a helper function to create a request handler
 */
export function createHandler(handler: RequestHandler) {
  return handler;
}
