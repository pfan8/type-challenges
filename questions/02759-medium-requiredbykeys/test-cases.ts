import type { Equal, Expect } from "@type-challenges/utils";

interface User {
  name?: string;
  age?: number;
  address?: string;
}

interface UserRequiredName {
  name: string;
  age?: number;
  address?: string;
}

interface UserRequiredNameAndAge {
  name: string;
  age: number;
  address?: string;
}

// type Compact<T> = {
//   [K in keyof T]: T[K];
// };

// type RequiredByKeys<T, K extends keyof T = keyof T> = Compact<
//   {
//     [k in keyof T as k extends K ? never : k]: T[k];
//   } & {
//     [k in keyof T as k extends K ? k : never]-?: T[k];
//   }
// >;
type RequiredByKeys<
  T,
  K extends keyof T = keyof T,
  O = Omit<T, K> & { [P in K]-?: T[P] }
> = { [P in keyof O]: O[P] };

type test = RequiredByKeys<User, "name">;

type cases = [
  Expect<Equal<RequiredByKeys<User, "name">, UserRequiredName>>,
  Expect<Equal<RequiredByKeys<User, "name" | "age">, UserRequiredNameAndAge>>,
  Expect<Equal<RequiredByKeys<User>, Required<User>>>,
  // @ts-expect-error
  Expect<Equal<RequiredByKeys<User, "name" | "unknown">, UserRequiredName>>
];
