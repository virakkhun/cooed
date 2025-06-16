import { Cooed, Static } from "@cooed/cooed-router";
import { Engine } from "@cooed/start";

const server = new Cooed({
  static: new Static({
    dir: "playgrounds/web/static",
  }),
});

const engine = new Engine({
  document: `${Deno.cwd()}/playgrounds/web/index.html`,
  pageDir: `${Deno.cwd()}/playgrounds/web/pages`,
});

server.get("*", (ctx) => {
  return engine.render(ctx.request.raw);
});

Deno.serve((req) => server.serve(req));
