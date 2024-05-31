type TodoType = "one-time" | "daily";

interface Todo {
  _id: string;
  title: string;
  isDone: boolean;
  type: TodoType;
}
