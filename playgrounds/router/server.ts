import { createHandler, Server } from "@cooed/router";

const server = new Server();

const middleware = createHandler((ctx) => {
  return ctx.next;
});

server.get("/:id/:path", middleware, (ctx) => {
  const params = ctx.params;
  return Response.json(params);
});

const client = server.group("/client", (ctx) => {
  if (ctx.request.url.includes("?")) {
    return new Response("url can't be include query", {
      status: 400,
    });
  }

  return ctx.next;
});

client.get("/", () => new Response("Hello client"));
client.get("/:param", (ctx) => {
  return Response.json(ctx.params);
});

server.report();

Deno.serve({ port: 8000 }, async (req) => await server.serve(req));
