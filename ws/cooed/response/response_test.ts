import { expect } from "@std/expect";
import { CooedResponse } from "./index.ts";
import { HttpStatus } from "../constants.ts";

Deno.test({
  name: "Test CooedResponse",
  async fn(t) {
    const res = new CooedResponse();

    await t.step({
      name: "Should return an instance of CooedResponse",
      fn() {
        expect(res).toBeInstanceOf(CooedResponse);
      },
    });

    await t.step({
      name: "Should return 400 bad request when calling res.badRequest()",
      fn() {
        const notFound = res.badRequest();
        expect(notFound).toBeInstanceOf(Response);
        expect(notFound.ok).toStrictEqual(false);
        expect(notFound.status).toStrictEqual(HttpStatus.BadRequest);
      },
    });

    await t.step({
      name: "Should return 401 unauthorized when calling res.unauthorized()",
      fn() {
        const notFound = res.unauthorized();
        expect(notFound).toBeInstanceOf(Response);
        expect(notFound.ok).toStrictEqual(false);
        expect(notFound.status).toStrictEqual(HttpStatus.Unauthorized);
      },
    });

    await t.step({
      name: "Should return 403 forbidden when calling res.forbidden()",
      fn() {
        const notFound = res.forbidden();
        expect(notFound).toBeInstanceOf(Response);
        expect(notFound.ok).toStrictEqual(false);
        expect(notFound.status).toStrictEqual(HttpStatus.Forbidden);
      },
    });

    await t.step({
      name: "Should return 404 not found when calling res.notFound()",
      fn() {
        const notFound = res.notFound();
        expect(notFound).toBeInstanceOf(Response);
        expect(notFound.ok).toStrictEqual(false);
        expect(notFound.status).toStrictEqual(HttpStatus.NotFound);
      },
    });

    await t.step({
      name:
        "Should return 405 method not allowed when calling res.methodNotAllowed()",
      fn() {
        const notFound = res.methodNotAllowed();
        expect(notFound).toBeInstanceOf(Response);
        expect(notFound.ok).toStrictEqual(false);
        expect(notFound.status).toStrictEqual(HttpStatus.MethodNotAllowed);
      },
    });

    await t.step({
      name:
        "Should return 415 unsupported media types when calling res.unsupportedMediaType()",
      fn() {
        const notFound = res.unsupportedMediaType();
        expect(notFound).toBeInstanceOf(Response);
        expect(notFound.ok).toStrictEqual(false);
        expect(notFound.status).toStrictEqual(HttpStatus.UnsupportedMediaType);
      },
    });

    await t.step({
      name:
        "Should return 422 method not allowed when calling res.unprocessableContent()",
      fn() {
        const notFound = res.unprocessableContent();
        expect(notFound).toBeInstanceOf(Response);
        expect(notFound.ok).toStrictEqual(false);
        expect(notFound.status).toStrictEqual(HttpStatus.UnprocessableContent);
      },
    });

    await t.step({
      name: "Test on CooedResponse.headers",
      async fn(t) {
        const instance = res.headers({
          "X-Server": "CooedRouter",
          "X-Extra": "Tea",
        });

        await t.step({
          name: "Should return an instance of CooedResponse when res.headers()",
          fn() {
            expect(instance).toBeInstanceOf(CooedResponse);
          },
        });

        await t.step({
          name: "Should return response when calling .send()",
          fn() {
            const endRes = instance.send();

            expect(endRes).toBeInstanceOf(Response);
            expect(endRes.headers).toBeInstanceOf(Headers);
            expect(endRes.headers.get("X-Server")).toStrictEqual("CooedRouter");
            expect(endRes.headers.get("X-Extra")).toStrictEqual("Tea");
          },
        });
      },
    });
  },
});

Deno.test({
  name: "Test on CooedResponse.text",
  async fn(t) {
    const cooed = new CooedResponse();
    const instance = cooed.text("Hello Cooed Router");

    await t.step({
      name: "Should return an instance of CooedResponse when res.text()",
      fn() {
        expect(instance).toBeInstanceOf(CooedResponse);
      },
    });

    await t.step({
      name: "Should return response when calling .send()",
      async fn() {
        const endRes = instance.send();

        expect(endRes).toBeInstanceOf(Response);
        expect(endRes.ok).toStrictEqual(true);
        expect(endRes.status).toStrictEqual(HttpStatus.Ok);
        expect(endRes.headers.get("Content-Type")).toStrictEqual("text/plain");
        expect(await endRes.text()).toStrictEqual("Hello Cooed Router");
      },
    });
  },
});

Deno.test({
  name: "Test on CooedResponse.json",
  async fn(t) {
    const cooed = new CooedResponse();
    const instance = cooed.json("Hello Cooed Router");

    await t.step({
      name: "Should return an instance of CooedResponse when res.json()",
      fn() {
        expect(instance).toBeInstanceOf(CooedResponse);
      },
    });

    await t.step({
      name: "Should return response with stringify body when calling .send()",
      async fn() {
        const endRes = instance.send();

        expect(endRes).toBeInstanceOf(Response);
        expect(endRes.ok).toStrictEqual(true);
        expect(endRes.status).toStrictEqual(HttpStatus.Ok);
        expect(endRes.headers.get("Content-Type")).toStrictEqual(
          "application/json",
        );
        expect(await endRes.json()).toStrictEqual("Hello Cooed Router");
      },
    });
  },
});

Deno.test({
  name: "Test on all chaining",
  async fn(t) {
    const cooed = new CooedResponse();

    await t.step({
      name: "Should return an instance of CooedResponse when res.json()",
      fn() {
        expect(cooed).toBeInstanceOf(CooedResponse);
      },
    });

    await t.step({
      name:
        "Should return a hello body, headers: X-Server: 'CooedRouter', statusText: 'Successfully response'",
      async fn() {
        const endRes = cooed
          .text("hello")
          .headers({ "X-Server": "CooedRouter" })
          .send("Successfully response");

        expect(endRes).toBeInstanceOf(Response);
        expect(endRes.ok).toStrictEqual(true);
        expect(endRes.status).toStrictEqual(HttpStatus.Ok);
        expect(endRes.headers.get("Content-Type")).toStrictEqual("text/plain");
        expect(endRes.headers.get("X-Server")).toStrictEqual("CooedRouter");
        expect(endRes.statusText).toStrictEqual("Successfully response");
        expect(endRes.bodyUsed).toStrictEqual(false);
        expect(await endRes.text()).toStrictEqual("hello");
        expect(endRes.bodyUsed).toStrictEqual(true);
      },
    });
  },
});
