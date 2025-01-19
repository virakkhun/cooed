export type Merge<
  T extends Record<string, unknown>,
  P extends Record<string, unknown>,
> = T & P;
