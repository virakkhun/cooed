import { expect } from "@std/expect";
import { HttpMethod } from "../../router/type.ts";
import type { IncomingRoute } from "../index.ts";
import { makeRouteKey } from "./route-key.ts";

Deno.test({
  name: "makeRouteKey",
  async fn(t) {
    const util = makeRouteKey();
    const route: IncomingRoute = {
      path: "/user",
      method: HttpMethod.Get,
    };

    await t.step({
      name: "Should return '/user___GET' when serialize({method: 'GET', path: '/user'})",
      fn() {
        const result = util.serialize(route);
        expect(result).toBeTruthy();
        expect(result).toStrictEqual("/user___GET");
      },
    });

    await t.step({
      name: "Should return '/user' when deSerialize('/user___GET')",
      fn() {
        const result = util.deSerialize("/user___GET");
        expect(result).toBeTruthy();
        expect(result).toStrictEqual("/user");
      },
    });
  },
});
