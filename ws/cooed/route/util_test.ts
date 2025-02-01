import { expect } from "@std/expect";
import { dynamicPatternLookup, groupStaticPattern } from "./util.ts";
import { groupDynamicPattern } from "./util.ts";

const userDetailLookUpStub = "/users/046d6e87-4e14-4757-8db0-2c34cf44d10a";
const userProfileLookUpStub =
  "/users/046d6e87-4e14-4757-8db0-2c34cf44d10a/profile";
const superDynamicStub = "/ae5d82ca-8c83-4027-99e0-af6f0726c6f4/-xjku";
const undefinedStub = "/undefined";

const dynamicPatternStub = ["/users/:id", "/users/:id/profile", "/:id/:slug"];

Deno.test({
  name: "Dynamic pattern look up",
  async fn(t) {
    await t.step({
      name: "Should return undefined when lookup for non existed pattern",
      fn() {
        const value = dynamicPatternLookup(undefinedStub, dynamicPatternStub);
        expect(value).toStrictEqual(undefined);
      },
    });

    await t.step({
      name: `Should return /users/:id when lookup for ${userDetailLookUpStub}`,
      fn() {
        const value = dynamicPatternLookup(
          userDetailLookUpStub,
          dynamicPatternStub,
        );
        expect(value).toStrictEqual("/users/:id");
      },
    });

    await t.step({
      name:
        `Should return /users/:id/profile when lookup for ${userProfileLookUpStub}`,
      fn() {
        const value = dynamicPatternLookup(
          userProfileLookUpStub,
          dynamicPatternStub,
        );
        expect(value).toStrictEqual("/users/:id/profile");
      },
    });

    await t.step({
      name: `Should return /:id/:slug when lookup for ${superDynamicStub}`,
      fn() {
        const value = dynamicPatternLookup(
          superDynamicStub,
          dynamicPatternStub,
        );
        expect(value).toStrictEqual("/:id/:slug");
      },
    });
  },
});

Deno.test({
  name: "Grouping static pattern contains params",
  async fn(t) {
    await t.step({
      name: "Should return non empty array",
      fn() {
        const value = groupStaticPattern(...dynamicPatternStub);
        expect(value.length).toEqual(2);
        expect(value).toStrictEqual(["/users/:id", "/users/:id/profile"]);
      },
    });

    await t.step({
      name: "Should return an emtpy array",
      fn() {
        const value = groupStaticPattern("/:id/:slug", "/:users/:profile");
        expect(value.length).toStrictEqual(0);
        expect(value).toStrictEqual([]);
      },
    });
  },
});

Deno.test({
  name: "Grouping dynamic pattern",
  async fn(t) {
    await t.step({
      name: "Should return non empty array",
      fn() {
        const value = groupDynamicPattern(...dynamicPatternStub);
        expect(value.length).toEqual(1);
        expect(value).toStrictEqual(["/:id/:slug"]);
      },
    });

    await t.step({
      name: "Should return an emtpy array",
      fn() {
        const value = groupDynamicPattern("/users/:id", "/users/:id/profile");
        expect(value.length).toStrictEqual(0);
        expect(value).toStrictEqual([]);
      },
    });
  },
});
