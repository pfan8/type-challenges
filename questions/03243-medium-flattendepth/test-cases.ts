import type { Equal, Expect } from "@type-challenges/utils";

type FlattenDepth<
  T extends any[],
  L extends number = 1,
  U extends any[] = []
> = T extends [infer F, ...infer R]
  ? F extends any[]
    ? U["length"] extends L
      ? [F, ...FlattenDepth<R, L, U>]
      : [...FlattenDepth<F, L, [0, ...U]>, ...FlattenDepth<R, L, U>]
    : [F, ...FlattenDepth<R, L, U>]
  : T;

/** 逻辑复杂时，是否可以尝试先写 js 伪码，再反推成 ts？
function FlattenDepth(T, Limit, Used) {
  if(T extends [F, ...R]) {
      if(F is array) {
        if(Used == Limit) {
          return [F, ...FlattenDepth(R, Limit, Used)]
        } else {
          return [...FlattenDepth(F, Limit, Used+1), ...FlattenDepth(R, Limit, Used)]
        }
      } else {
        return [F, FlattenDepth(R, Limit, Used)]
      }
    } else {
      return T
    }
}
    */

type cases = [
  Expect<Equal<FlattenDepth<[]>, []>>,
  Expect<Equal<FlattenDepth<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<FlattenDepth<[1, [2]]>, [1, 2]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
  Expect<
    Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>
  >
];
