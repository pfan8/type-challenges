import type { Equal, Expect } from "@type-challenges/utils";

// way1: length of the union
// relate to a hard challenge: UnionToTuple
// 将 U 转换为 Tuple，然后判断其长度即可
type U2I<U> = (U extends any ? (u: U) => any : never) extends (
  i: infer I
) => any
  ? I
  : never;
type Last<U> = U2I<U extends any ? () => U : never> extends () => infer R
  ? R
  : never;
type ToTuple<U> = [U] extends [never]
  ? []
  : [Last<U>, ...ToTuple<Exclude<U, Last<U>>>];
type IsUnion1<U, Count = ToTuple<U>["length"]> = Count extends 0
  ? false
  : Count extends 1
  ? false
  : true;

// way2: distributive & (true | false === boolean)
// 假设 U 中的元素是顶点，对 U 中任取两个（可放回）元素进行 extends 判断，视为顶点间拥有一条有向边。
// 那么我们在第二个 conditional type 的 distribution 中就构建了一个有向完全图，每条有向边的运算
// 结果会给出 a part of boolean(true/false)，最后，这些结果会被 union 到一起。
// 若 U 中仅包含一个元素，那么结果将为 ture/false 中的一种，否则为 boolean
type IsUnion2<U, U1 = U> = Equal<
  U extends any ? (U1 extends U ? true : false) : false,
  boolean
>;

// way3: distributive
// 将未被 distributed 的 [union] 与被 distributed 的 [element of the union] 进行比较，在
// 第三个 conditional type 中，将不会发生 distribute。
// 第三层的结果会被第二层 union 起来，但对第二层中每个 distribute 出去的 case，结果均一致。
type IsUnion<U, U1 = U> = [U] extends [never]
  ? false
  : U extends any
  ? [U1] extends [U]
    ? false
    : true
  : never;

type cases = [
  Expect<Equal<IsUnion<string>, false>>,
  Expect<Equal<IsUnion<string | number>, true>>,
  Expect<Equal<IsUnion<"a" | "b" | "c" | "d">, true>>,
  Expect<Equal<IsUnion<undefined | null | void | "">, true>>,
  Expect<Equal<IsUnion<{ a: string } | { a: number }>, true>>,
  Expect<Equal<IsUnion<{ a: string | number }>, false>>,
  Expect<Equal<IsUnion<[string | number]>, false>>,
  // Cases where T resolves to a non-union type.
  Expect<Equal<IsUnion<string | never>, false>>,
  Expect<Equal<IsUnion<string | unknown>, false>>,
  Expect<Equal<IsUnion<string | any>, false>>,
  Expect<Equal<IsUnion<string | "a">, false>>,
  Expect<Equal<IsUnion<never>, false>>
];
