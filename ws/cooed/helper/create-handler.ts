import type { RequestHandler } from "../router/type.ts";

/**
 * a helper function to create a request handler
 * @function createHandler
 * @param {RequestHandler} handler
 * @description a helper function to create a request handler
 * @returns {RequestHandler} RequestHandler
 * @example
 * ```ts
 * const handler = createHandler((ctx) => new Response('Hello world'))
 * ```
 */
export function createHandler(handler: RequestHandler): RequestHandler {
  return handler;
}
