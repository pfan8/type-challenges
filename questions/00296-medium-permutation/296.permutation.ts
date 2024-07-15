// type test = key in 'A' | 'B' | 'C'

// type Omit<T, K> = T extends K ? never : T;

// type test = ["a", "b"][number];

type MyPermutation<T extends string | number | symbol, A extends any[] = []> = [
  T
] extends [never]
  ? A
  : { [key in T]: MyPermutation<Exclude<T, key>, [...A, key]> }[T];

type perm2 = MyPermutation<"A" | "B" | "C">;

type perm = Permutation<"A" | "B" | "C">; // ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']

type Test<T, K = T> = T extends never ? T : never;

type test = Test<"A" | "B" | "C">;

type Permutation<T, K = T> = [T] extends [never]
  ? []
  : K extends K
  ? [K, ...Permutation<Exclude<T, K>>]
  : never;
