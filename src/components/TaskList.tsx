import React from "react";
import "../styles/TaskList.scss";
import TodoTask from "./TodoTask";
import { Space } from "antd";
import { RootState } from "../state/store";
import { connect } from "react-redux";

interface TaskListProps {
  todoList: Todo[];
}

const TaskList: React.FC<TaskListProps> = ({ todoList }: TaskListProps) => {
  const listItems = todoList.map((todo) => {
    return <TodoTask key={todo._id} todo={todo} />;
  });

  return (
    <Space
      className="task-list"
      direction="vertical"
      size="middle"
      style={{ display: "flex" }}
    >
      {listItems}
    </Space>
  );
};

const mapStateToProps = (state: RootState) => ({
  todoList: state.todoSlice.todos,
});

export default connect(mapStateToProps)(TaskList);
