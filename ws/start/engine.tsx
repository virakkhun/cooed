import type { EngineConfig, PageMod } from "./type.ts";
import { renderToStaticMarkup } from "react-dom/server";
import { PageContext } from "./ctx.ts";

/**
 * a class to create a render engine to render html document
 */
export class Engine {
  #bodyPlaceholder = "<%body%>";

  constructor(private _config: EngineConfig) {}

  async render(request: Request): Promise<Response> {
    const { pathname } = new URL(request.url);
    const mod = await this._resolvePage(pathname);
    const doc = await this._resolveDocument();
    const Page = mod.default;
    const res = mod.loader$
      ? await mod.loader$<Response | Record<string, unknown>>(request)
      : {};

    if (res instanceof Response) return res;

    const jsx = renderToStaticMarkup(
      <PageContext.Provider value={{ request, data: res }}>
        <Page />
      </PageContext.Provider>,
    );

    const html = doc.replace(this.#bodyPlaceholder, jsx);

    return new Response(html, {
      headers: {
        "Content-Type": "text/html",
        "X-Powered-by": "@cooed/start @cooed/cooed-router",
      },
    });
  }

  private async _resolvePage(path: string): Promise<PageMod> {
    const file = path === "/" ? "/index.tsx" : `${path}.tsx`;
    const mod = await import(`${this._config.pageDir}${file}`);
    if (!mod.default) throw new Error("Page does not export default...");
    return mod;
  }

  private async _resolveDocument() {
    return await Deno.readTextFile(this._config.document);
  }
}
