import { MIME_TYPE } from "../constants.ts";
import type { StaticConfig } from "./type.ts";

/**
 * @class Static<T extends string>
 * @description to serve a static content by providing to server constructor
 *
 * @example
 * ```ts
 * const app = new CooedServer({
 *  static: new Static<string>({
 *    dir: 'static'
 *  })
 * })
 * ```
 * see example at {@link https://github.com/virakkhun/cooed/blob/develop/playgrounds/static/server.ts}
 *
 * @publicApi
 */
export class Static<T extends string = ""> {
  #staticEntry = new Map<string, string>();
  #cwd = Deno.cwd();

  constructor(private _config: StaticConfig<T>) {
    this._registerStaticPath(this._fullDir);
  }

  async resolve(path: string) {
    const fullPath = this.#staticEntry.get(path);
    if (!fullPath) return undefined;

    const contentType = this._determineMimeType(fullPath);

    const { href } = new URL(fullPath, import.meta.url);
    const resp = await fetch(href);

    if (!resp.ok) return undefined;

    return new Response(resp.body, {
      headers: {
        "Content-Type": contentType,
      },
    });
  }

  private _registerStaticPath(fullPath: string) {
    const { isDirectory } = Deno.statSync(fullPath);
    if (!isDirectory) throw new Error(`${this._fullDir} is not a directory`);

    const dir = Deno.readDirSync(fullPath);
    for (const d of dir) {
      if (d.isDirectory) {
        const nextDir = [fullPath, d.name].join("/");
        this._registerStaticPath(nextDir);
      } else {
        const filePath = [fullPath, d.name].join("/");
        const key = this._makeKey(filePath);
        this.#staticEntry.set(key, filePath);
      }
    }
  }

  public report() {
    console.log("\n%c+ Static\n", "color:white; font-weight:bold;");
    console.log("files:", this.#staticEntry.size);
  }

  private get _fullDir() {
    return [this.#cwd, this._config.dir].join("/");
  }

  private _makeKey(filePath: string) {
    const rootFragmentLength = this._fullDir.split("/").length;
    const fileFragmentLength = filePath.split("/").length;

    return [
      "/",
      ...filePath
        .split("/")
        .slice(rootFragmentLength - fileFragmentLength)
        .join("/"),
    ].join("");
  }

  private _determineMimeType(fullPath: string) {
    const lastFragment = fullPath.split("/").at(-1);
    const ext = lastFragment ? lastFragment.split(".").at(-1) : MIME_TYPE.plain;
    const mime = ext
      ? MIME_TYPE[ext as keyof typeof MIME_TYPE]
      : MIME_TYPE.plain;
    return mime ?? MIME_TYPE.plain;
  }
}
