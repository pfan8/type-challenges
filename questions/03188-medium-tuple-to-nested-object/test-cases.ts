import type { Equal, Expect } from "@type-challenges/utils";

type TupleToNestedObject<T, V> = T extends [infer F, ...infer R]
  ? {
      [K in F & string]: TupleToNestedObject<R, V>;
    }
  : V;

type cases = [
  Expect<Equal<TupleToNestedObject<["a"], string>, { a: string }>>,
  Expect<Equal<TupleToNestedObject<["a", "b"], number>, { a: { b: number } }>>,
  Expect<
    Equal<
      TupleToNestedObject<["a", "b", "c"], boolean>,
      { a: { b: { c: boolean } } }
    >
  >,
  Expect<Equal<TupleToNestedObject<[], boolean>, boolean>>
];
