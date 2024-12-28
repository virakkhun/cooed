import { RequestHandler } from "./router/type.ts";
import { Server } from "./server.ts";

const server = new Server();

const middleware: RequestHandler = (_req, next) => {
  return next;
};

server.get("/", middleware, () => {
  return Response.json("Hello world!!");
});

const client = server.group("/client");

client.get("/", () => new Response("Hello client"));

server.report();

Deno.serve({ port: 8000 }, async (req) => await server.serve(req));
