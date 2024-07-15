interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type MyReadonly2<T, R extends keyof T> = {
  readonly [K in keyof T as K extends R ? K : never]: T[K];
} & {
  [K in keyof T as K extends R ? never : K]: T[K];
};

const todo: MyReadonly2<Todo, "title" | "description"> = {
  title: "Hey",
  description: "foobar",
  completed: false,
};

todo.title = "Hello"; // Error: cannot reassign a readonly property
todo.description = "barFoo"; // Error: cannot reassign a readonly property
todo.completed = true; // OK
