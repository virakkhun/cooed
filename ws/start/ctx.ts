import { createContext } from "react";

export type PageCtx<
  T extends Record<string, unknown> = Record<string, unknown>,
> = {
  request: Readonly<Request>;
  data: T;
};

export const PageContext = createContext(<Readonly<PageCtx>>{});
