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

// type test = ((u: string) => any) | ((u: number) => any)
// type Test<U> = (U extends any ? (u: U) => any : never) extends (
//   i: infer I
// ) => any
//   ? I
//   : never;
// // () => string | () => number
// type Test2<U> = U extends any ? () => U : never;
// type Test3<U> = Test2<U> extends () => infer R ? R : never;

// type test = Test<string | number>;
// type test2 = Test2<string | number>;
// type test3 = Test3<string | number>;

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
// type IsUnion<U, U1 = U> = [U] extends [never]
//   ? false
//   : U extends any
//   ? [U1] extends [U]
//     ? false
//     : true
//   : never;

/**
 * 1. 利用 Distributive 把 Union 所有值映射到函数参数 args，得到 (args:u1)=>any | (args:u2)=>any | ...，假设结果为 R1
 * 2. 通过 R1 extends (args: infer I) => any 再次 Distributive，同时结合 function contravariant，会得到 infer 的值是 intersection，即 u1 & u2 & ...
 */
type U2I2<U> = (U extends any ? (args: U) => any : never) extends (
  args: infer I
) => any
  ? I
  : never;
/**
 * 3. 前置将泛型 T 通过 Distributive 映射成函数的 args 或者返回值（两种方法都行，下面只展示 args），结果会和 R1 类似（如果是 args），假设结果为 R3
 * 4. R3 作为 U2I 的泛型传入，由于函数重载的存在，R3 可以从 union 变为 intersection，例如 (args:u1)=>any & (args:u2)=>any & ...，假设结果为 R4
 * 5. R4 extends (i: infer R) => R : never，利用 TS 函数重载的特性（LSP 只展示最后一项），从而得到 R4 中的最后一项
 */
type GetLast<T> = U2I2<T extends any ? (i: T) => any : never> extends (
  i: infer R
) => any
  ? R
  : never;
/**
 * 6. 通过 GetLast，不断获取最后一项，并丢入数组中，当 U 为空（never)时，A 的长度就对应了原 Union 的个数
 */
type U2Tuple<U> = [U] extends [never]
  ? []
  : [Last<U>, ...ToTuple<Exclude<U, Last<U>>>];

type IsUnion<U, Count = U2Tuple<U>["length"]> = Count extends 0
  ? false
  : Count extends 1
  ? false
  : true;

type test = U2I2<string | number>;
type test2 = GetLast<string | number>;
type test3 = IsUnion<string>;

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
