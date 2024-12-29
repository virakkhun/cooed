import { createHandler, Server } from "@cooed/router";

const server = new Server();

const middleware = createHandler((_, next) => {
  return next;
});

server.get("/", middleware, () => {
  return Response.json("Hello world!!");
});

const client = server.group("/client", (req, next) => {
  if (req.url.includes("?"))
    return new Response("url can't be include query", {
      status: 400,
    });

  return next;
});

client.get("/", () => new Response("Hello client"));

server.report();

Deno.serve({ port: 8000 }, async (req) => await server.serve(req));
