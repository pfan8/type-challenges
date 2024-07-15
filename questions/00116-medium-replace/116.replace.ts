type Replace<
  T extends string,
  From extends string,
  To extends string
> = T extends `${infer A}${From}${infer B}`
  ? `${A}${To}${Replace<B, From, To>}`
  : T;

type replaced = Replace<"types are fun! fun fun fun", "fun", "awesome">; // expected to be 'types are awesome!'
