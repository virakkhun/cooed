import type { IncomingRoute } from "../type.ts";

export function makeRouteKey() {
  const indexingSeperator = "___";
  const serializeIndexedRegex = /___\w+/g;
  return {
    serialize(route: IncomingRoute) {
      return [route.path, route.method].join(indexingSeperator);
    },
    deSerialize(serializedRouteKey: string) {
      return serializedRouteKey.replace(serializeIndexedRegex, "");
    },
  };
}
