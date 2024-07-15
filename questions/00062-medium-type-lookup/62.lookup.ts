interface Cat {
  type: "cat";
  breeds: "Abyssinian" | "Shorthair" | "Curl" | "Bengal";
}

interface Dog {
  type: "dog";
  breeds: "Hound" | "Brittany" | "Bulldog" | "Boxer";
  color: "brown" | "white" | "black";
}

interface Mouse {
  type: "mouse";
  breeds: "Hound" | "Brittany" | "Bulldog" | "Boxer";
  color: "brown" | "white" | "black";
}

// T['type'] not work, must use conditional type with Generics raw type
type LookUpNotWork<
  T extends { type: string },
  K extends keyof T["type"]
> = T["type"] extends K ? T : never;

type LookUp<T extends { type: string }, K extends T["type"]> = T extends {
  type: K;
}
  ? T
  : never;

type MyDogType = LookUp<Cat | Dog | Mouse, "dog">; // expected to be `Dog`
