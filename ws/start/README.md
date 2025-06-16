# @cooed/start 🦕🚀

Render page based on fs-route.

> example:

[fs route with @cooed/start](https://github.com/virakkhun/cooed/tree/develop/playgrounds/web)

```sh
pages/
  index.tsx
  blogs/
    index.tsx
index.html # document
server.ts # server entry file
```

- create index.html file as a main html document

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Hello Cooed Start</title>
  </head>
  <body>
    <%body%>
  </body>
</html>
```

- create a server.ts file as a entry

```ts
// server.ts
import { Cooed, Static } from "@cooed/cooed-router";
import { Engine } from "@cooed/start";

const server = new Cooed({
  static: new Static({
    dir: "path-to-static-dir",
  }),
});

const engine = new Engine({
  document: `path-to-html-doc`,
  pageDir: `path-to-pages-dir`,
});

server.get("*", (ctx) => {
  return engine.render(ctx.request.raw);
});

Deno.serve((req) => server.serve(req));
```

🧾 License

MIT License

Copyright (c) 2024 Virak Khun
