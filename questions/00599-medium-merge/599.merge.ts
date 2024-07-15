type foo = {
  name: string;
  age: string;
};
type coo = {
  age: number;
  sex: string;
};

type Merge<F, S> = {
  [K in keyof F | keyof S]: K extends keyof S
    ? S[K]
    : K extends keyof F
    ? F[K]
    : never;
};

type Result = Merge<foo, coo>; // expected to be {name: string, age: number, sex: string}
