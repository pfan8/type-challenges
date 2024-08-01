import type { Equal, Expect } from "@type-challenges/utils";

type ExtractValuesOfTuple<T extends any[]> = T[keyof T & number];

/**
 * [Use Funtion Contravariant feature](https://stackoverflow.com/questions/66493902/typescript-intersection-types-of-function)
 * UnionToIntersection<{ foo: string } | { bar: string }> =
 *  { foo: string } & { bar: string }.
 */
type UnionToIntersection<U> = (
  U extends unknown ? (arg: U) => 0 : never
) extends (arg: infer I) => 0
  ? I
  : never;
/**
 * [Use Function Overload will show Last in Type Inference]()
 * LastInUnion<1 | 2> = 2.
 */
// UnionToIntersection<((x: 1) => 0) | ((x: 2) => 0)>
type LastInUnion<U> = UnionToIntersection<
  U extends unknown ? (x: U) => 0 : never
> extends (x: infer L) => 0
  ? L
  : never;

/**
 * UnionToTuple<1 | 2> = [1, 2].
 */
type UnionToTuple<U, Last = LastInUnion<U>> = [U] extends [never]
  ? []
  : [...UnionToTuple<Exclude<U, Last>>, Last];

type cases = [
  Expect<Equal<UnionToTuple<"a" | "b">["length"], 2>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<"a" | "b">>, "a" | "b">>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<"a">>, "a">>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<any>>, any>>,
  Expect<
    Equal<ExtractValuesOfTuple<UnionToTuple<undefined | void | 1>>, void | 1>
  >,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<any | 1>>, any | 1>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<any | 1>>, any>>,
  Expect<
    Equal<
      ExtractValuesOfTuple<UnionToTuple<"d" | "f" | 1 | never>>,
      "f" | "d" | 1
    >
  >,
  Expect<
    Equal<ExtractValuesOfTuple<UnionToTuple<[{ a: 1 }] | 1>>, [{ a: 1 }] | 1>
  >,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<never>>, never>>,
  Expect<
    Equal<
      ExtractValuesOfTuple<
        UnionToTuple<"a" | "b" | "c" | 1 | 2 | "d" | "e" | "f" | "g">
      >,
      "f" | "e" | 1 | 2 | "g" | "c" | "d" | "a" | "b"
    >
  >
];
