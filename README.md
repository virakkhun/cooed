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

const middleware: RequestHandler = (_req, next) => {
  return next;
};

server.get("/", middleware, () => {
  return Response.json("Hello world!!");
});

const client = server.group("/client");

client.get("/", () => new Response("Hello client"));

// call this to log the report of the registered handler
server.report();

// listen to Request through Deno.serve
Deno.serve({ port: 8000 }, async (req) => await server.serve(req));
```

🧾 License

MIT License

Copyright (c) 2024 Virak Khun
