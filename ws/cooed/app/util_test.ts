import { expect } from "@std/expect";
import { buildParams } from "./util.ts";

Deno.test({
  name: "Test buildParams",
  async fn(t) {
    const id = buildParams(
      "/user/d21931c2-8aaa-4c30-adad-5e6f3494ccb3",
      "/user/:id",
    );

    const slug = buildParams(
      "/user/d21931c2-8aaa-4c30-adad-5e6f3494ccb3/enterprise/agreement",
      "/user/:slug/:type/agreement",
    );

    await t.step({
      name: "Should return { id: 'd21931c2-8aaa-4c30-adad-5e6f3494ccb3' }",
      fn() {
        expect(id).toStrictEqual({
          id: "d21931c2-8aaa-4c30-adad-5e6f3494ccb3",
        });
        expect(id.id).toStrictEqual("d21931c2-8aaa-4c30-adad-5e6f3494ccb3");
      },
    });

    await t.step({
      name:
        "Should return { slug: 'd21931c2-8aaa-4c30-adad-5e6f3494ccb3', type: 'enterprise' }",
      fn() {
        expect(slug).toStrictEqual({
          slug: "d21931c2-8aaa-4c30-adad-5e6f3494ccb3",
          type: "enterprise",
        });
        expect(slug.slug).toStrictEqual("d21931c2-8aaa-4c30-adad-5e6f3494ccb3");
        expect(slug.type).toStrictEqual("enterprise");
      },
    });
  },
});
