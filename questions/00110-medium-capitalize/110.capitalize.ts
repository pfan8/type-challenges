type CapitalWord<T extends string> = T extends `${infer Char}${infer Rest}`
  ? `${Uppercase<Char>}${Rest}`
  : T;

type MyCapitalize<T extends string> = T extends `${infer Word1} ${infer Word2}`
  ? `${CapitalWord<Word1>} ${MyCapitalize<Word2>}`
  : CapitalWord<T>;

type capitalized = MyCapitalize<"hello world asdf asd f">; // expected to be 'Hello world'
