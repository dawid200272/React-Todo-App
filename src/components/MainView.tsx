import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import TaskList from "./TaskList";
import FormButton from "./FormButton";
import "../styles/MainView.scss";
import { Layout, Space, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import {
  createTodoAsync,
  deleteTodoAsync,
  loadTodosAsync,
  updateTodoAsync,
} from "../state/todo/todoSlice";

const { Header, Content, Footer } = Layout;

const MainView: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todoSlice.todos);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(loadTodosAsync());
  }, [dispatch]);

  const items = [
    <FormButton action={handleAdd} buttonName="Add" textColor="white" />,
    <Button onClick={clearTaskList}>Clear done</Button>,
    <Button onClick={resetDailyTasks}>Reset daily tasks</Button>,
  ];

  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Space
          direction="horizontal"
          className="options"
          style={{ flex: 1, minWidth: 0 }}
        >
          {items}
        </Space>
      </Header>
      <Content style={{ padding: "0 48px", minHeight: "85vh" }}>
        <div className="main-view">
          <TaskList />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        {new Date().getFullYear()}
      </Footer>
    </Layout>
  );

  async function handleAdd(name: string, type: TodoType) {
    const newTodo: Todo = {
      _id: uuidv4(),
      title: name,
      isDone: false,
      type: type,
    };
    dispatch(createTodoAsync(newTodo));
  }

  function clearTaskList() {
    const normalTasks = todos.filter((todo) => todo.type !== "daily");

    const finishedTasks = normalTasks.filter((todo) => todo.isDone === true);

    finishedTasks.forEach(async (todo) => {
      console.log("todo", todo);
      dispatch(deleteTodoAsync(todo));
    });
  }

  function resetDailyTasks() {
    const dailyTask = todos.filter((todo) => todo.type === "daily");

    dailyTask.forEach(async (todo) => {
      let todoToUpdate = Object.assign({}, todo);

      todoToUpdate.isDone = false;

      dispatch(updateTodoAsync(todoToUpdate));
    });
  }
};

export default MainView;
