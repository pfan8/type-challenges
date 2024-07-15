const Arr = ['1', '2', '3', true]

type ArrayElement<ArrayType extends readonly unknown[]> = 
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

type TupleToUnion<T extends readonly unknown[]> = T[number]

type Test = TupleToUnion<typeof Arr> // expected to be '1' | '2' | '3'