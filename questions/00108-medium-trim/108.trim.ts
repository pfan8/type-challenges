type TrimLeft<T extends string> = T extends ` ${infer Rest}`
  ? `${TrimLeft<Rest>}`
  : T;
type TrimRight<T extends string> = T extends `${infer Rest} `
  ? `${TrimRight<Rest>}`
  : T;

type Trim<T extends string> = TrimRight<TrimLeft<T>>;

type trimmed = Trim<"  Hello World  ">; // expected to be 'Hello World'
