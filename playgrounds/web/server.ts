import { Cooed, createHandler } from "@cooed/cooed-router";

const server = new Cooed();

const middleware = createHandler((ctx) => {
  return ctx.next;
});

server.get("/:id/:path", middleware, (ctx) => {
  const params = ctx.request.params;
  return Response.json(params);
});

server.get("*", (ctx) => ctx.response.json("everything bro").send("worked"));

const client = server.group("/client", (ctx) => {
  if (ctx.request.href.includes("?")) {
    return new Response("url can't be include query", {
      status: 400,
    });
  }

  return ctx.next;
});

client.get("/", () => new Response("Hello client"));
client.get("/:param", (ctx) => {
  return Response.json(ctx.request.params);
});

Deno.serve({ port: 8000 }, async (req) => await server.serve(req));
