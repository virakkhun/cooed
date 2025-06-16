import { Cooed, Static } from "@cooed/cooed-router";
import { Engine } from "@cooed/start";

const server = new Cooed({
  static: new Static({
    dir: "playgrounds/ssr/static",
  }),
});

const engine = new Engine({
  document: `${Deno.cwd()}/playgrounds/ssr/index.html`,
  pageDir: `${Deno.cwd()}/playgrounds/ssr/pages`,
});

server.get("*", (ctx) => {
  return engine.render(ctx.request.raw);
});

Deno.serve((req) => server.serve(req));
