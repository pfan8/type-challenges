import type { Equal, Expect } from "@type-challenges/utils";

// type Absolute<T extends number | bigint | string> = T extends number | bigint
//   ? Absolute<`${T}`>
//   : T extends `${infer flag}${infer Rest}`
//   ? flag extends "-"
//     ? Rest
//     : T
//   : T;

type Absolute<T extends number | string | bigint> = `${T}` extends `-${infer U}`
  ? U
  : `${T}`;

type cases = [
  Expect<Equal<Absolute<0>, "0">>,
  Expect<Equal<Absolute<-0>, "0">>,
  Expect<Equal<Absolute<10>, "10">>,
  Expect<Equal<Absolute<-5>, "5">>,
  Expect<Equal<Absolute<"0">, "0">>,
  Expect<Equal<Absolute<"-0">, "0">>,
  Expect<Equal<Absolute<"10">, "10">>,
  Expect<Equal<Absolute<"-5">, "5">>,
  Expect<Equal<Absolute<-1_000_000n>, "1000000">>,
  Expect<Equal<Absolute<9_999n>, "9999">>
];
