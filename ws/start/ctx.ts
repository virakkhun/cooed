import { createContext, type Context } from "react";

export type PageCtx<
  T extends Record<string, unknown> = Record<string, unknown>,
> = {
  request: Readonly<Request>;
  data: T;
};

export const PageContext: Context<Readonly<PageCtx>> = createContext(
  <Readonly<PageCtx>>{},
);
