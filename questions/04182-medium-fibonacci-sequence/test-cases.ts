import type { Equal, Expect } from "@type-challenges/utils";

type Fibonacci<
  T extends number,
  Timer extends number[] = [1],
  Pre extends any[] = [],
  Cur extends any[] = [1]
> = Timer["length"] extends T
  ? Cur["length"]
  : Fibonacci<T, [...Timer, 1], Cur, [...Pre, ...Cur]>;

type cases = [
  Expect<Equal<Fibonacci<1>, 1>>,
  Expect<Equal<Fibonacci<2>, 1>>,
  Expect<Equal<Fibonacci<3>, 2>>,
  Expect<Equal<Fibonacci<8>, 21>>
];
