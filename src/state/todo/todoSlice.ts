import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createTodo,
  deleteTodo,
  fetchTodos,
  updateTodo,
} from "../../ApiHandler";

// type TodoType = "one-time" | "daily";

// interface Todo {
//   id: string;
//   title: string;
//   isDone: boolean;
//   type: TodoType;
// }

interface TodoState {
  todos: Array<Todo>;
}

const initialState: TodoState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loadTodosAsync.pending, () => {
        console.log("loadTodosAsync.pending");
      })
      .addCase(
        loadTodosAsync.fulfilled,
        (state, action: PayloadAction<Array<Todo>>) => {
          state.todos = action.payload;
        }
      )
      .addCase(
        createTodoAsync.fulfilled,
        (state, action: PayloadAction<Todo>) => {
          state.todos.push(action.payload);
        }
      )
      .addCase(
        updateTodoAsync.fulfilled,
        (state, action: PayloadAction<Todo>) => {
          const updatedTodo = action.payload;
          let todoToUpdate = state.todos.find(
            (todo) => todo._id === updatedTodo._id
          );
          const index = state.todos.indexOf(todoToUpdate);
          state.todos[index] = updatedTodo;
        }
      )
      .addCase(
        deleteTodoAsync.fulfilled,
        (state, action: PayloadAction<Todo>) => {
          const deletedTodo = action.payload;
          state.todos = state.todos.filter(
            (todo) => todo._id !== deletedTodo._id
          );
        }
      );
  },
});

export const loadTodosAsync = createAsyncThunk(
  "todo/loadTodosAsync",
  async () => {
    const todoList: Array<Todo> = await fetchTodos();
    return todoList;
  }
);

export const createTodoAsync = createAsyncThunk(
  "todo/createTodoAsync",
  async (todo: Todo) => {
    const createdTodo = await createTodo(todo);
    return createdTodo;
  }
);

export const updateTodoAsync = createAsyncThunk(
  "todo/updateTodoAsync",
  async (todo: Todo) => {
    const updatedTodo = await updateTodo(todo);
    return updatedTodo;
  }
);

export const deleteTodoAsync = createAsyncThunk(
  "todo/deleteTodoAsync",
  async (todo: Todo) => {
    const deletedTodo = await deleteTodo(todo);
    return deletedTodo;
  }
);

export default todoSlice.reducer;
