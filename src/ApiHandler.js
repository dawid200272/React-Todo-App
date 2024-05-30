import axios from "axios";

const apiHost = "localhost";
const apiPort = 3015;

const instance = axios.create({
  baseURL: `http://${apiHost}:${apiPort}/api`,
});

const fetchTodos = async () => {
  try {
    var response = await instance.get("/todos");
    return response.data;
  } catch (error) {
    console.error(error);
    return;
  }
};

const createTodo = async (todo) => {
  try {
    var response = await instance.post("/todos", todo);
    return response.data;
  } catch (error) {
    console.error(error);
    return;
  }
};

const updateTodo = async (todo) => {
  try {
    var response = await instance.put(`/todos/${todo._id}`, todo);
    return response.data;
  } catch (error) {
    console.error(error);
    return;
  }
};

const deleteTodo = async (todo) => {
  try {
    var response = await instance.delete(`/todos/${todo._id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return;
  }
};

export { fetchTodos, createTodo, updateTodo, deleteTodo };
