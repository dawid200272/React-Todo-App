import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TaskList from "./TaskList.tsx";
import FormButton from "./FormButton";
import "../styles/MainView.css";
import { Layout, Space, Button } from "antd";
import {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../ApiHandler.js";

const { Header, Content, Footer } = Layout;

type TodoType = "one-time" | "daily";

class Todo {
  id: string;
  title: string;
  isDone: boolean;
  type: TodoType;
}

const MainView: React.FC = () => {
  const [taskList, setTaskList] = useState<Todo[]>([
    { id: uuidv4(), title: "finish app", isDone: false, type: "one-time" },
    { id: uuidv4(), title: "do tests", isDone: true, type: "daily" },
  ]);

  useEffect(() => {
    fetchTodos().then((data) => {
      setTaskList(data);
      console.log("data", data);
    });
  }, []);

  const items = [
    <FormButton action={handleAdd} buttonName="Add" textColor="white" />,
    <Button onClick={clearTaskList}>Clear done</Button>,
    <Button onClick={resetDailyTasks}>Reset daily tasks</Button>,
  ];

  async function toggleTask(id: string) {
    const newValue = [...taskList];
    const todo = newValue.find((todo) => todo.id === id)!;

    todo.isDone = !todo.isDone;

    let updatedTodo = await updateTodo(todo);

    console.log("udpated todo", updatedTodo);
    console.log("todo to update", todo);

    setTaskList(newValue);
  }

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
          <TaskList
            todoList={taskList}
            toggleAction={toggleTask}
            deleteAction={deleteTask}
          />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        {new Date().getFullYear()}
      </Footer>
    </Layout>
  );

  async function handleAdd(name: string, type: TodoType) {
    const newTodo = { id: uuidv4(), title: name, isDone: false, type: type };

    const createdTodo = await createTodo(newTodo);

    console.log("created todo", createdTodo);
    console.log("new todo", newTodo);

    setTaskList((prevTaskList) => {
      return [...prevTaskList, newTodo];
    });
  }

  function clearTaskList() {
    const normalTasks = taskList.filter((todo) => todo.type !== "daily");
    const dailyTasks = taskList.filter((todo) => todo.type === "daily");

    const notFinishedTasks = normalTasks.filter(
      (todo) => todo.isDone === false
    );

    const finishedTasks = normalTasks.filter((todo) => todo.isDone === true);

    finishedTasks.forEach(async (todo, index) => {
      console.log("todo", todo);
      await deleteTodo(todo);
    });

    setTaskList([...notFinishedTasks, ...dailyTasks]);
  }

  function resetDailyTasks() {
    const dailyTask = taskList.filter((todo) => todo.type === "daily");

    dailyTask.forEach(async (todo) => {
      todo.isDone = false;

      await updateTodo(todo);
    });

    const otherTasks = taskList.filter((todo) => todo.type !== "daily");

    setTaskList([...otherTasks, ...dailyTask]);
  }

  async function deleteTask(id: string) {
    const newList = taskList.filter((todo) => todo.id !== id);

    const todoToDelete = taskList.filter((todo) => todo.id === id)[0];

    await deleteTodo(todoToDelete);

    setTaskList(newList);
  }
};

export default MainView;
