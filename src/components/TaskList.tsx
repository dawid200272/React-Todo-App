import React from "react";
import "../styles/TaskList.css";
import TodoTask from "./TodoTask";
import { Space } from "antd";
import { RootState } from "../state/store";
import { connect } from "react-redux";

type TodoType = "one-time" | "daily";

// class Todo {
//   id: string;
//   title: string;
//   isDone: boolean;
//   type: TodoType;
// };

interface TaskListProps {
  todoList: Todo[];
  // toggleAction: TodoAction;
  // deleteAction: TodoAction;
}

const TaskList: React.FC<TaskListProps> = ({
  todoList,
}: // toggleAction,
// deleteAction,
TaskListProps) => {
  const listItems = todoList.map((todo) => {
    return (
      <TodoTask
        key={todo._id}
        todo={todo}
        // action={toggleAction}
        // deleteAction={deleteAction}
      />
    );
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

// const mapDispatchToProps = dispatch => {

// }

export default connect(mapStateToProps)(TaskList);
