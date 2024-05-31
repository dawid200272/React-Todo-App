import React from "react";
import "../styles/TodoTask.scss";
import Button from "./Button";
import { Card } from "antd";
import { deleteTodoAsync, updateTodoAsync } from "../state/todo/todoSlice";
import { AppDispatch, RootState } from "../state/store";
import { connect, useSelector } from "react-redux";

interface TodoAction {
  (todo: Todo): void;
}

interface TodoTaskProps {
  todo: Todo;
  toggleAction: TodoAction;
  deleteAction: TodoAction;
}

const TodoTask: React.FC<TodoTaskProps> = ({
  todo,
  toggleAction,
  deleteAction,
}) => {
  // const currentTodo = useSelector(
  //   (state: RootState) => state.todoSlice.todos
  // ).filter((todo) => todo._id === todo._id)[0];

  const handleToogle = () => {
    let todoToUpdate = Object.assign({}, todo);

    todoToUpdate.isDone = !todo.isDone;

    toggleAction(todoToUpdate);
  };

  const handleDelete = () => {
    let todoToDelete = Object.assign({}, todo);

    deleteAction(todoToDelete);
  };

  return (
    <Card
      className={
        "todo-card" +
        (todo.type === "daily" ? " daily" : "") +
        (todo.isDone ? " done" : "")
      }
    >
      <label className={"todo-header" + (todo.isDone ? " done" : "")}>
        <input
          type="checkbox"
          className="done-indicator"
          checked={todo.isDone}
          onChange={handleToogle}
        />
        <h4>{todo.title}</h4>
      </label>
      <Button action={handleDelete} name="Delete" />
    </Card>
  );
};

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  toggleAction: (todo) => dispatch(updateTodoAsync(todo)),
  deleteAction: (todo) => dispatch(deleteTodoAsync(todo)),
});

export default connect(null, mapDispatchToProps)(TodoTask);
