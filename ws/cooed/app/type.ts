type EntryDir<T extends string> = T extends `/${string}`
  ? "Please remove prefix forward slash"
  : T;

/**
 * @type StaticConfig
 * serve static file config
 * @property dir
 * @property extrasMimeType
 */
export interface StaticConfig<T extends string = ""> {
  /**
   * @property dir
   * @type EntryDir<T>
   * static directory location
   * @example
   * ```typescript
   * {
   *   dir: 'static'
   * }
   * ```
   */
  dir: EntryDir<T>;
  /**
   * to provide extras mime types
   * @optional @property extrasMimeType
   */
  extrasMimeType?: Record<string, string>;
}
