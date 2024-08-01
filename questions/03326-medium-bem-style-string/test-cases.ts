import type { Equal, Expect } from "@type-challenges/utils";

type BEM_ELEMENT<F extends string[]> = F["length"] extends 0
  ? ""
  : `__${F[number]}`;

type BEM_MODIFIER<M extends string[]> = M["length"] extends 0
  ? ""
  : `--${M[number]}`;

type BEM<
  T extends string,
  F extends string[],
  M extends string[]
> = `${T}${BEM_ELEMENT<F>}${BEM_MODIFIER<M>}`;
type test = BEM<"btn", ["price"], ["warning", "success"]>;

type cases = [
  Expect<Equal<BEM<"btn", ["price"], []>, "btn__price">>,
  Expect<
    Equal<
      BEM<"btn", ["price"], ["warning", "success"]>,
      "btn__price--warning" | "btn__price--success"
    >
  >,
  Expect<
    Equal<
      BEM<"btn", [], ["small", "medium", "large"]>,
      "btn--small" | "btn--medium" | "btn--large"
    >
  >
];
