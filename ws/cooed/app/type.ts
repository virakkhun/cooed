type EntryDir<T extends string> = T extends `/${string}`
  ? "Please remove prefix forward slash"
  : T;

/**
 * @type StaticConfig
 * @description serve static file config
 * @property dir
 * @property extrasMimeType
 */
export interface StaticConfig<T extends string = ""> {
  /**
   * @property dir
   * @type EntryDir<T>
   * @description static directory location
   * @example
   * ```typescript
   * {
   *   dir: 'static'
   * }
   * ```
   */
  dir: EntryDir<T>;
  /**
   * @optional @property extrasMimeType
   * @description to provide extras mime types
   */
  extrasMimeType?: Record<string, string>;
}
