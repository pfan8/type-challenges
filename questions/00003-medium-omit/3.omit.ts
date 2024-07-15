interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type MyOmit<T, O extends keyof T> = {
  [K in keyof T as K extends O ? never : K]: T[K];
};

type TodoPreview = MyOmit<Todo, "description" | "title">;

const todo: TodoPreview = {
  completed: false,
};

type Union1 = "a" | "b" | "c";

type Union2 = {
  [K in Union1]: { eventName: K; featureName: string };
}[Union1];
