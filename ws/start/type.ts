import type * as React from "react";

export type EngineConfig = {
  document: string;
  pageDir: string;
};

export type PageMod = {
  default(): React.JSX.Element;
  loader$<T>(req: Request): Promise<T | Response>;
};
