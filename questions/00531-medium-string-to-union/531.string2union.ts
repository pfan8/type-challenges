type Test = "123";

type StringToUnion<T extends string> = T extends `${infer C}${infer Rest}`
  ? C | StringToUnion<Rest>
  : never;

type Result = StringToUnion<Test>; // expected to be "1" | "2" | "3"
