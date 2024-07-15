type Fn = (a: number, b: string) => number;

type AppendArgument<F extends (...args: any) => any, T> = F extends (
  ...args: infer A
) => infer R
  ? (...args: [...A, T]) => R
  : never;

type Result = AppendArgument<Fn, boolean>;
// expected be (a: number, b: string, x: boolean) => number
