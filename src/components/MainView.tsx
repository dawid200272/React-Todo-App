import React, {useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import TaskList from './TaskList.tsx';
import FormButton from './FormButton';
import '../styles/MainView.css';
import { Layout, Space, Button } from 'antd';

const { Header, Content, Footer } = Layout;

type TodoType = "one-time" | "daily";

class Todo {
  id: string;
  title: string;
  isDone: boolean;
  type: TodoType;
};

const MainView: React.FC = () => {

  const [taskList, setTaskList] = useState<Todo[]>([
    {id: uuidv4(), title: 'finish app', isDone: false, type: 'one-time'}, 
    {id: uuidv4(), title: 'do tests', isDone: true, type: 'daily'}
  ]);

  const items = [
    <FormButton action={handleAdd} buttonName='Add' textColor='white'/>,
    <Button onClick={clearTaskList}>Clear done</Button>,
    <Button onClick={resetDailyTasks}>Reset daily tasks</Button>
  ];

  function toggleTask(id: string) {
    const newValue = [...taskList];
    const todo = newValue.find(todo => todo.id === id)!;

    todo.isDone = !todo.isDone;
    setTaskList(newValue);
  }

  return (
    <Layout>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Space
          direction="horizontal"
          className='options'
          style={{ flex: 1, minWidth: 0 }}
        >
          {items}
        </Space>
      </Header>
      <Content style={{ padding: '0 48px', minHeight: '85vh' }}>
        <div className='main-view'>
          <TaskList todoList={taskList} toggleAction={toggleTask} deleteAction={deleteTask}/>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        { new Date().getFullYear()}
      </Footer>
    </Layout>
  )
  
  function handleAdd(name: string, type: TodoType) {
    setTaskList(prevTaskList => {return [...prevTaskList, {id: uuidv4(), title: name, isDone: false, type: type}]; });
  }
  
  function clearTaskList() {
    const normalTasks = taskList.filter(todo => todo.type !== 'daily');
    const dailyTasks = taskList.filter(todo => todo.type === 'daily');

    const notFinishedTasks = normalTasks.filter(todo => todo.isDone === false);

    setTaskList([...notFinishedTasks, ...dailyTasks]);
  }

  function resetDailyTasks() {
    const dailyTask = taskList.filter(todo => todo.type === 'daily');

    dailyTask.forEach(todo => todo.isDone = false);
    
    const otherTasks = taskList.filter(todo => todo.type !== 'daily');

    setTaskList([...otherTasks, ...dailyTask]);
  }

  function deleteTask(id: string) {
    const newList = taskList.filter(todo => todo.id !== id);

    setTaskList(newList);
  }
}

export default MainView