import { HttpMethod } from "../router/type.ts";
import { Route } from "./route.ts";
import { expect } from "jsr:@std/expect";
import { RouteCtx } from "./type.ts";

const helloGetStub: RouteCtx = {
  method: HttpMethod.Get,
  path: "/hello",
  handlers: [(_request) => new Response("world")],
};

const helloPostStub: RouteCtx = {
  method: HttpMethod.Post,
  path: "/hello",
  handlers: [(_request) => new Response("post hello")],
};

const spyRequestCtx = {
  req: <Request> {},
  nextFunc: () => {},
};

Deno.test({
  name: "Testing on Route",
  async fn(t) {
    const route = new Route();

    await t.step({
      name: "Should create an instance",
      fn() {
        expect(route).toBeTruthy();
      },
    });

    await t.step({
      name: "Should get 0 of the routes",
      fn() {
        expect(route.routes.size).toBe(0);
      },
    });

    await t.step({
      name: "Should get the size of 1",
      fn() {
        route.addRoutes(helloGetStub);
        expect(route.routes.size).toBe(1);
      },
    });

    await t.step({
      name: "Should throw an error when trying to add same route",
      fn() {
        const errorFn = () => route.addRoutes(helloGetStub);
        expect(errorFn).toThrow(/(registered)/);
      },
    });

    await t.step({
      name: "Should get the size of 2 after adding another route",
      fn() {
        route.addRoutes(helloPostStub);
        expect(route.routes.size).toStrictEqual(2);
      },
    });

    await t.step({
      name:
        "Should resolve a handler when providing {path: '/hello', method: 'GET'}",
      async fn(t) {
        const handlers = route.resolveHandler({
          path: "/hello",
          method: HttpMethod.Get,
        });

        expect(handlers.length).toBe(1);
        expect(handlers).toBeInstanceOf(Array);

        await t.step({
          name: "Should get a handler with type of Function & undefined",
          fn() {
            const handler = handlers[0];
            expect(handler).toBeInstanceOf(Function);
            expect(handler).not.toBeUndefined();
          },
        });

        await t.step({
          name: "Should get a response when back handle a request",
          async fn() {
            const handler = handlers[0];
            const res = handler(spyRequestCtx.req, spyRequestCtx.nextFunc);
            expect(res).toBeInstanceOf(Response);
            expect((<Response> res).ok).toBe(true);
            expect(await (<Response> res).text()).toStrictEqual("world");
          },
        });
      },
    });

    await t.step({
      name:
        "Should return not found response when route to none-registered route",
      fn() {
        const handlers = route.resolveHandler({
          path: "/somethingelse",
          method: HttpMethod.Get,
        });

        expect(handlers.length).toBe(1);
        expect(handlers).toBeInstanceOf(Array);

        const handler = handlers[0];

        const res = <Response> (
          handler(spyRequestCtx.req, spyRequestCtx.nextFunc)
        );
        expect(res).toBeInstanceOf(Response);
        expect(res.ok).toStrictEqual(false);
        expect(res.status).toStrictEqual(404);
      },
    });
  },
});
