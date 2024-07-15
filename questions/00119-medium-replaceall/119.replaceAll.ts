// type ReplaceAll<
//   T extends string,
//   R,
//   R2 extends string
// > = T extends `${infer FC}${infer RC}`
//   ? FC extends R
//     ? `${R2}${ReplaceAll<RC, R, R2>}`
//     : `${FC}${ReplaceAll<RC, R, R2>}`
//   : T;
type ReplaceAll<
  S extends string,
  From extends string,
  To extends string
> = From extends ""
  ? S
  : S extends `${infer R1}${From}${infer R2}`
  ? `${R1}${To}${ReplaceAll<R2, From, To>}`
  : S;

type replaced = ReplaceAll<"t y p e s", " ", "">; // expected to be 'types'
type replaced2 = ReplaceAll<"t&&y&&p&&e&&s", "&&", "">; // expected to be 'types'
