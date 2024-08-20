import type { Equal, Expect } from "@type-challenges/utils";

/**
 * 其实最好是先转 number 为 string，然后再比较 string，这样可以避免 number 过大，生成数组性能损耗问题，甚至溢出 OOM
 *
 * 但是 TS 中想比较两个 string 的大小，避免不掉比较数组大小，虽然可以实现，但比较麻烦
 * 实现伪码如下：
 * 1. 转 number 为 string
 * 2. 比较两个 string 的长度，需要转为数组，然后比较两个数组的长度
 * 3. 如果长度相等，逐个比较 string 中对应位置的字符，从 0 到 9 遍历，这里用 TS 实现也会很麻烦，hard code 过多
 *
 * 总之，这个问题不适合用 TS 来实现，最好用其他语言
 */

// type Num2Arr<N extends number, Arr extends any[] = []> = Arr["length"] extends N
//   ? Arr
//   : Num2Arr<N, [...Arr, 0]>;

// type GreaterThanStr<
//   S1 extends `${number}`,
//   S2 extends `${number}`
// > = ;

// type GreaterThan<N1 extends number, N2 extends number> = GreaterThanStr<
//   `${N1}`,
//   `${N2}`
// >;

type ArrayWithLength<
  T extends number,
  U extends any[] = []
> = U["length"] extends T ? U : ArrayWithLength<T, [true, ...U]>;

type GreaterThan<
  T extends number,
  U extends number
> = ArrayWithLength<U> extends [...ArrayWithLength<T>, ...infer _]
  ? false
  : true;

type cases = [
  Expect<Equal<GreaterThan<1, 0>, true>>,
  Expect<Equal<GreaterThan<5, 4>, true>>,
  Expect<Equal<GreaterThan<4, 5>, false>>,
  Expect<Equal<GreaterThan<0, 0>, false>>,
  Expect<Equal<GreaterThan<10, 9>, true>>,
  Expect<Equal<GreaterThan<20, 20>, false>>,
  Expect<Equal<GreaterThan<10, 100>, false>>,
  Expect<Equal<GreaterThan<111, 11>, true>>,
  Expect<Equal<GreaterThan<1234567891011, 1234567891010>, true>>
];
