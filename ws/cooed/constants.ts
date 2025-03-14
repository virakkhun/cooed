/**
 * @description default mime types, extracting from IANA
 *
 * @see IANA database {@link https://www.iana.org/assignments/media-types/media-types.xhtml}
 */
export const MIME_TYPE = Object.freeze({
  js: "text/javascript",
  html: "text/html",
  htm: "text/html",
  css: "text/css",
  csv: "text/csv",
  xml: "text/xml",
  xsl: "text/xml",
  plain: "text/plain",
  txt: "text/plain",
  text: "text/plain",
  conf: "text/plain",
  markdown: "text/markdown",
  md: "text/markdown",
  mdx: "text/markdown",
  yaml: "application/yaml",
  yml: "application/yml",
  ecma: "application/ecmascript",
  gzip: "application/gzip",
  gz: "application/gzip",
  tgz: "application/gzip",
  json: "application/json",
  tar: "application/tar",
  otf: "font/otf",
  woff: "font/woff",
  woff2: "font/woff2",
  avif: "image/avif",
  gif: "image/gif",
  heif: "image/heif",
  heic: "image/heic",
  png: "image/png",
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  pjpg: "image/pjeg",
  svg: "image/svg+xml",
  tif: "image/tif",
  tiff: "image/tiff",
  webp: "image/webp",
  dng: "image/dng",
  ico: "image/x-icon",
  mp3: "audio/mpeg",
  mp4: "video/mp4",
  mpeg: "video/mpeg",
  mov: "video/quicktime",
});

export enum HttpStatus {
  Ok = 200,
  Created = 201,
  Accepted = 202,
  NonAuthoritativeInformation = 201,
  NoContent = 204,
  MovePermenantly = 301,
  PermenatRedirect = 308,
  Found = 302,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  RequestTimeout = 408,
  Conflict = 409,
  UnsupportedMediaType = 415,
  UnprocessableContent = 422,
  UpgradeRequired = 426,
  TooManyRequest = 429,
  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,
  GatewayTimeout = 504,
}
