import React from 'react';
import '../styles/TaskList.css';
import TodoTask from './TodoTask';
import { Space } from 'antd';

type TodoType = "one-time" | "daily";

class Todo {
  id: string;
  title: string;
  isDone: boolean;
  type: TodoType;
};

interface TodoAction {
  (id: string): void
}

interface TaskListProps {
  todoList: Todo[];
  toggleAction: TodoAction
  deleteAction: TodoAction
}

const TaskList: React.FC<TaskListProps> = ({todoList, toggleAction, deleteAction}) => {

  const listItems = todoList.map(todo => {
    return <TodoTask key={todo.id} todo={todo} action={toggleAction} deleteAction={deleteAction}/>
  })

  return (
    <Space 
      className='task-list'
      direction='vertical'
      size='middle'
      style={{ display: 'flex' }}
    >
      {listItems}
    </Space>
  )
}

export default TaskList