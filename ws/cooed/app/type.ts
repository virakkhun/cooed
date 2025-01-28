export interface StaticConfig {
  dir: string;
}

export type ServerConfig = {
  static?: StaticConfig;
};
