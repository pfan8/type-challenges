import type { Equal, Expect } from "@type-challenges/utils";

// type AllCombinations<
//   S extends string,
//   U extends string = ""
// > = S extends `${infer F}${infer Rest}`
//   ? AllCombinations<Rest, U extends U ? F | U | `${F}${U}` | `${U}${F}` : U>
//   : U;

// type StringToUnion<S> = S extends `${infer F}${infer R}`
//   ? F | StringToUnion<R>
//   : S;
// type AllCombinations<
//   S extends string,
//   T extends string = StringToUnion<S>,
//   U extends string = T
// > = S extends `${string}${infer R}`
//   ? U extends U
//     ? `${U}${AllCombinations<R, U extends "" ? T : Exclude<T, U>>}`
//     : never
//   : "";

// 将字符串转换为联合类型
type StringToUnion<S extends string> = S extends `${infer C}${infer R}`
  ? C | StringToUnion<R>
  : never;

// 连接两个字符串
type Concat<S1 extends string, S2 extends string> = `${S1}${S2}`;

// 生成所有组合
type AllCombinations<S extends string, U extends string = StringToUnion<S>> = [
  U
] extends [never]
  ? ""
  : "" | { [K in U]: Concat<K, AllCombinations<Exclude<U, K>>> }[U];

type GetIdxArray<
  S extends string,
  Cur extends number[] = [],
  Res extends number[] = []
> = S extends `${string}${infer Rest}`
  ? GetIdxArray<Rest, [...Cur, 1], [...Res, Cur["length"]]>
  : Res;

// type ts = GetIdxArray<"abc">

interface QueueItem {
  val: string;
  remain: number[];
}

// eggache: TS 泛型如何存储中间变量？

// 定义一个辅助类型，用于处理数组中的每个元素
type ProcessElement<T> = T extends number ? `${T}${T}` : T;

// 定义递归类型，用于遍历数组
type LoopArray<T extends any[]> = T extends [infer First, ...infer Rest]
  ? [ProcessElement<First>, ...LoopArray<Rest>]
  : [];

// 测试用例
type Result = LoopArray<[1, 2, 3, 4]>; // [2, 4, 6, 8]

type AllCombinations_BFS<
  S extends string,
  Q extends QueueItem[],
  Result extends string[]
> = S;

type AllCombinations2<S extends string> = AllCombinations_BFS<
  S,
  [{ val: ""; remain: GetIdxArray<S> }],
  []
>;

type A = boolean | null;

const func = (): A => {
  return Math.random() > 0.5 ? true : null;
};

let a: A = func();

if (a) {
  const b: boolean = a;
}

// 测试用例
type result = Exclude<StringToUnion<"ABC">, "B">;

type test = AllCombinations<"ABC">;

type cases = [
  Expect<Equal<AllCombinations<"">, "">>,
  Expect<Equal<AllCombinations<"A">, "" | "A">>,
  Expect<Equal<AllCombinations<"AB">, "" | "A" | "B" | "AB" | "BA">>,
  Expect<
    Equal<
      AllCombinations<"ABC">,
      | ""
      | "A"
      | "B"
      | "C"
      | "AB"
      | "AC"
      | "BA"
      | "BC"
      | "CA"
      | "CB"
      | "ABC"
      | "ACB"
      | "BAC"
      | "BCA"
      | "CAB"
      | "CBA"
    >
  >,
  Expect<
    Equal<
      AllCombinations<"ABCD">,
      | ""
      | "A"
      | "B"
      | "C"
      | "D"
      | "AB"
      | "AC"
      | "AD"
      | "BA"
      | "BC"
      | "BD"
      | "CA"
      | "CB"
      | "CD"
      | "DA"
      | "DB"
      | "DC"
      | "ABC"
      | "ABD"
      | "ACB"
      | "ACD"
      | "ADB"
      | "ADC"
      | "BAC"
      | "BAD"
      | "BCA"
      | "BCD"
      | "BDA"
      | "BDC"
      | "CAB"
      | "CAD"
      | "CBA"
      | "CBD"
      | "CDA"
      | "CDB"
      | "DAB"
      | "DAC"
      | "DBA"
      | "DBC"
      | "DCA"
      | "DCB"
      | "ABCD"
      | "ABDC"
      | "ACBD"
      | "ACDB"
      | "ADBC"
      | "ADCB"
      | "BACD"
      | "BADC"
      | "BCAD"
      | "BCDA"
      | "BDAC"
      | "BDCA"
      | "CABD"
      | "CADB"
      | "CBAD"
      | "CBDA"
      | "CDAB"
      | "CDBA"
      | "DABC"
      | "DACB"
      | "DBAC"
      | "DBCA"
      | "DCAB"
      | "DCBA"
    >
  >
];
