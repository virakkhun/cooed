export function groupOccurrences(...arr: string[]) {
  return arr.reduce(
    (res, value) => {
      return Object.assign(res, {
        [value]: arr.filter((v) => v === value).length,
      });
    },
    <Record<string, number>> {},
  );
}

function staticPatternFn(fragment: string) {
  return /\/\w+/g.test(fragment);
}

export function groupStaticPattern(...fragments: string[]) {
  return fragments.filter(staticPatternFn);
}

export function groupDynamicPattern(...fragments: string[]) {
  return fragments.filter((value) => !staticPatternFn(value));
}

export function countMatchingFragments(...arr: string[]) {
  const record = groupOccurrences(...arr);
  return Object.values(record)
    .filter((v) => v > 1)
    .reduce((prev, curr) => (prev += curr), 0);
}

export function dynamicPatternLookup(lookup: string, patterns: string[]) {
  const staticPatterns = groupStaticPattern(...patterns);

  const lookUpFragments = lookup.split("/").filter(Boolean);

  const [resolvedInStatic] = staticPatterns
    .filter((v) => {
      const fragments = v.split("/").filter(Boolean);
      const someMatched = fragments.some((v) => lookUpFragments.includes(v));
      const fragmentLengthMatched = fragments.length === lookUpFragments.length;
      return fragmentLengthMatched && someMatched;
    })
    .sort((a, b) => {
      const aFragments = a.split("/");
      const bFragments = b.split("/");
      const next = countMatchingFragments(...lookUpFragments, ...bFragments);
      const prev = countMatchingFragments(...lookUpFragments, ...aFragments);
      return next - prev;
    });

  if (resolvedInStatic) return resolvedInStatic;

  const dynamicPatterns = groupDynamicPattern(...patterns);
  return dynamicPatterns.find((v) => {
    const fragments = v.split("/").filter(Boolean);
    return fragments.length === lookUpFragments.length;
  });
}
