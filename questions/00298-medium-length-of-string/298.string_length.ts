// Compute the length of a string literal, which behaves like String#length.
type StringLength<
  S extends string,
  L extends string[] = []
> = S extends `${infer C}${infer Rest}`
  ? StringLength<Rest, [...L, C]>
  : L["length"];

type LengthOfHello = StringLength<"hello">; // 应为 5
type LengthOfEmpty = StringLength<"">; // 应为 0
