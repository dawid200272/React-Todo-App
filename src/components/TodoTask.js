import React from 'react';
import '../styles/TodoTask.css';
import Button from './Button';
import { Card } from 'antd';

function TodoTask({ todo, action, deleteAction }) {

  const handleToogle = () => {
    action(todo.id);
  }

  const handleDelete = () => {
    deleteAction(todo.id);
  }

  return (
    <Card 
      className={'todo-card' + (todo.type === 'daily' ? ' daily' : '') + (todo.isDone ? ' done' : '')}
    >
      <label className={'todo-header' + (todo.isDone ? ' done' : '')}>
        <input type='checkbox' className='done-indicator' checked={todo.isDone} onChange={handleToogle}/>
        <h4>{todo.title}</h4>
      </label>
      <Button action={handleDelete} name='Delete'/>
    </Card>
  )
}

export default TodoTask