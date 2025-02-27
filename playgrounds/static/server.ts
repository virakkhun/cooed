import { Cooed, Static } from "@cooed/cooed-router";

const server = new Cooed({
  static: new Static({
    dir: "playgrounds/static/dist",
  }),
});

server.get("/", async () => {
  const index = await Deno.readTextFile("playgrounds/static/dist/index.html");
  return new Response(index, {
    headers: {
      "Content-Type": "text/html",
    },
  });
});

Deno.serve(async (req) => {
  return await server.serve(req);
});
