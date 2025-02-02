import { expect } from "@std/expect";
import { CooedRequest } from "./index.ts";
import { HttpMethod } from "../router/index.ts";

const requestStub: Request = new Request("http://localhost:8000/h/cool", {
  method: "GET",
  redirect: undefined,
  headers: {
    accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "accept-encoding": "gzip, deflate, br, zstd",
    "accept-language": "en-US,en;q=0.9,km;q=0.8",
    "cache-control": "max-age=0",
    connection: "keep-alive",
    host: "localhost:8000",
    "sec-ch-ua":
      '"Not A(Brand";v="8", "Chromium";v="132", "Google Chrome";v="132"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"macOS"',
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "none",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
    "user-agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36",
  },
});

Deno.test({
  name: "Test CooedRequest",
  async fn(t) {
    const instance = new CooedRequest<string>(requestStub, "/:id/:param");

    await t.step({
      name: "Should return an instance of CooedRequest",
      fn() {
        expect(instance).toBeInstanceOf(CooedRequest);
      },
    });

    await t.step({
      name: "Should return an url of <http://localhost:8000/h/cool>",
      fn() {
        expect(instance.href).toStrictEqual("http://localhost:8000/h/cool");
      },
    });

    await t.step({
      name: "Should return http protocol",
      fn() {
        expect(instance.protocol).toStrictEqual("http:");
      },
    });

    await t.step({
      name: "Should return method <GET>",
      fn() {
        expect(instance.method).toStrictEqual(HttpMethod.Get);
      },
    });

    await t.step({
      name: "Should return origin of <http://localhost:8000>",
      fn() {
        expect(instance.origin).toStrictEqual("http://localhost:8000");
      },
    });

    await t.step({
      name: "Should return port equal to 8000",
      fn() {
        expect(instance.port).toStrictEqual("8000");
      },
    });

    await t.step({
      name: "Should return path equal to </h/cool>",
      fn() {
        expect(instance.path).toStrictEqual("/h/cool");
      },
    });

    await t.step({
      name: "Should return an instance of Request when calling .raw",
      fn() {
        expect(instance.raw).toBeInstanceOf(Request);
      },
    });

    await t.step({
      name: "Should return params equal to {id: 'h', param: 'cool'}",
      fn() {
        expect(instance.params).toBeInstanceOf(Object);
        expect(instance.params).toStrictEqual({ id: "h", param: "cool" });
      },
    });

    await t.step({
      name: "Should return an empty query",
      fn() {
        expect(instance.query).toBeInstanceOf(URLSearchParams);
        expect(instance.query.size).toStrictEqual(0);
      },
    });

    await t.step({
      name: "Should return host equal to <localhost:8000>",
      fn() {
        expect(instance.host).toStrictEqual("localhost:8000");
      },
    });

    await t.step({
      name: "Should return headers size equal to 15",
      fn() {
        expect(instance.headers).toBeInstanceOf(Headers);
        expect([...instance.headers.keys()].length).toStrictEqual(15);
      },
    });

    await t.step({
      name: "Should return connection equal to keep-alive",
      fn() {
        expect(instance.headers.get("connection")).toStrictEqual("keep-alive");
      },
    });

    await t.step({
      name: "Should an empty string when calling .text",
      async fn() {
        const res = await instance.text();
        expect(res).toStrictEqual("");
      },
    });

    await t.step({
      name: "Should throw an error with message <Cannot read properties of undefined (reading 'blob')>",
      fn() {
        expect(instance.blob).toThrow(
          "Cannot read properties of undefined (reading 'blob')",
        );
      },
    });
  },
});
