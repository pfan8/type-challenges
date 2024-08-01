import type { Equal, Expect } from "@type-challenges/utils";

type Shift<T extends any[]> = T extends any[]
  ? T extends [unknown, ...infer R]
    ? [...R]
    : T
  : never;

type cases = [
  // @ts-expect-error
  Shift<unknown>,
  Expect<Equal<Shift<[]>, []>>,
  Expect<Equal<Shift<[1]>, []>>,
  Expect<Equal<Shift<[3, 2, 1]>, [2, 1]>>,
  Expect<Equal<Shift<["a", "b", "c", "d"]>, ["b", "c", "d"]>>
];
