import type { Equal, Expect } from "@type-challenges/utils";

// [Solution 1 - Array]: 简单易懂，缺点是超过 1000 lsp 就罢工
// type Pop<T extends any[]> = T extends [...infer head, any] ? head : never;

// type MinusOne<T extends number, A extends any[] = []> = A['length'] extends T
//   ? Pop<A>['length']
//   : MinusOne<T, [...A, 0]>

// [Solution 2 - String]：复杂，但是能 Cover 所有 case，另有有 ts 4.8 版本的限制（infer 反推）
type ParseInt<T extends string> = T extends `${infer Digit extends number}`
  ? Digit
  : never;
type ReverseString<S extends string> = S extends `${infer First}${infer Rest}`
  ? `${ReverseString<Rest>}${First}`
  : "";
type RemoveLeadingZeros<S extends string> = S extends "0"
  ? S
  : S extends `${"0"}${infer R}`
  ? RemoveLeadingZeros<R>
  : S;
type InternalMinusOne<S extends string> =
  S extends `${infer Digit extends number}${infer Rest}`
    ? Digit extends 0
      ? `9${InternalMinusOne<Rest>}`
      : `${[9, 0, 1, 2, 3, 4, 5, 6, 7, 8][Digit]}${Rest}`
    : never;

type InternalPlusOne<S extends string> = S extends "9"
  ? "01"
  : S extends `${infer Digit extends number}${infer Rest}`
  ? Digit extends 9
    ? `0${InternalPlusOne<Rest>}`
    : `${[1, 2, 3, 4, 5, 6, 7, 8, 9][Digit]}${Rest}`
  : never;

type PutSign<S extends string> = `-${S}`;

type MinusOne<T extends number> = T extends 0
  ? -1
  : `${T}` extends `-${infer Abs}`
  ? ParseInt<PutSign<ReverseString<InternalPlusOne<ReverseString<`${Abs}`>>>>>
  : ParseInt<
      RemoveLeadingZeros<ReverseString<InternalMinusOne<ReverseString<`${T}`>>>>
    >;

type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  Expect<Equal<MinusOne<1101>, 1100>>,
  Expect<Equal<MinusOne<0>, -1>>,
  Expect<Equal<MinusOne<9_007_199_254_740_992>, 9_007_199_254_740_991>>
];
