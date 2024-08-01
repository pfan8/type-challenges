import type { Equal, Expect, NotEqual } from "@type-challenges/utils";

type Flip<T extends Record<string, string | number | boolean>> = {
  [P in keyof T as `${T[P]}`]: P;
};

type test = Flip<{ pi: 3.14; bool: true }>;

type cases = [
  Expect<Equal<{ a: "pi" }, Flip<{ pi: "a" }>>>,
  Expect<NotEqual<{ b: "pi" }, Flip<{ pi: "a" }>>>,
  Expect<Equal<{ 3.14: "pi"; true: "bool" }, Flip<{ pi: 3.14; bool: true }>>>,
  Expect<
    Equal<{ val2: "prop2"; val: "prop" }, Flip<{ prop: "val"; prop2: "val2" }>>
  >
];
