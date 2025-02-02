import { expect } from "@std/expect";
import { CooedRequest } from "./index.ts";
import { HttpMethod } from "../router/type.ts";

const reqJsonBodyStub = new Request(
  "http://localhost:8000/user/profile?id=2f3ddc7e-dbe5-40c8-bf67-8f6bff978cc2",
  {
    method: "PATCH",
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
    body: JSON.stringify({ hello: "world" }),
  },
);

Deno.test({
  name: "Test json body request",
  async fn(t) {
    const instance = new CooedRequest(reqJsonBodyStub, "/user/profile");

    await t.step({
      name: "Should return an instance of <CooedRequest>",
      fn() {
        expect(instance).toBeInstanceOf(CooedRequest);
      },
    });

    await t.step({
      name: "Should return method equal to PATCH",
      fn() {
        expect(instance.method).toStrictEqual(HttpMethod.Patch);
      },
    });

    await t.step({
      name: "Should get a strinify when calling instance.json()",
      async fn() {
        const body = await instance.json<{ hello: string }>();
        expect(body).toBeTruthy();
        expect(body).toBeInstanceOf(Object);
        expect(body.hello).toStrictEqual("world");
      },
    });
  },
});
