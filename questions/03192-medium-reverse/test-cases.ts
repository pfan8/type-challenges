import type { Equal, Expect } from "@type-challenges/utils";

type Reverse<T extends any[], R extends any[] = []> = T extends [
  infer F,
  ...infer Rest
]
  ? Reverse<[...Rest], [F, ...R]>
  : [...R, ...T];

// Reverse<["b"], ["a"]>
// Reverse<[], ["a", "b"]>
type test = Reverse<["a", "b"]>;

type cases = [
  Expect<Equal<Reverse<[]>, []>>,
  Expect<Equal<Reverse<["a", "b"]>, ["b", "a"]>>,
  Expect<Equal<Reverse<["a", "b", "c"]>, ["c", "b", "a"]>>
];

type errors = [
  // @ts-expect-error
  Reverse<"string">,
  // @ts-expect-error
  Reverse<{ key: "value" }>
];
