type Keyable<T extends string> = T extends `${infer F}/${string}` ? F : T;

export type ExtractKeys<
  T extends string,
  K extends string[] = [],
> = T extends `${string}/:${infer U}` ? ExtractKeys<U, [...K, Keyable<U>]>
  : K[number];
