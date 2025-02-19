# cooed 🦕

cooed is a simple and minimal http routing library, to handle request `Request`
from Deno.serve.

features:

- routing 🌀
- group 🌀
- middleware 🥷
- static 🗒️

> example:

here is the small server setup to handle request from Deno.serve.

```ts
import { CooedServer, RequestHandler, Static } from "@cooed/router";

const server = new CooedServer({
  static: new Static({
    // dist is the location where the static content located
    dir: "dist",
  }),
});

const middleware: RequestHandler = (ctx) => {
  if (ctx.request.method === "GET") {
    return ctx.response.badRequest();
  }
  return next;
};

server.get("/", middleware, (ctx) => {
  return ctx.response.json("Hello world!!").send();
});

const client = server.group("/client");

client.get("/", () => new Response("Hello client"));

// listen to Request through Deno.serve
Deno.serve({ port: 8000 }, async (req) => await server.serve(req));
```

🧾 License

MIT License

Copyright (c) 2024 Virak Khun
