import type { Equal, Expect } from "@type-challenges/utils";

type Foo = {
  name: string;
  age: string;
};
type Bar = {
  name: string;
  age: string;
  gender: number;
};
type Coo = {
  name: string;
  gender: number;
};

type Diff<
  T extends Record<string, unknown>,
  O extends Record<string, unknown>
> = {
  [key in keyof T | keyof O as key extends keyof T & keyof O
    ? never
    : key]: key extends keyof T ? T[key] : key extends keyof O ? O[key] : never;
};

// type Diff<O, O1> = Omit<O & O1, keyof (O | O1)>;

type cases = [
  Expect<Equal<Diff<Foo, Bar>, { gender: number }>>,
  Expect<Equal<Diff<Bar, Foo>, { gender: number }>>,
  Expect<Equal<Diff<Foo, Coo>, { age: string; gender: number }>>,
  Expect<Equal<Diff<Coo, Foo>, { age: string; gender: number }>>
];
