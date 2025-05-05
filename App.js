import React, { useState } from 'react';
import { motion } from "framer-motion";
import styled from "styled-components";

const Container = styled.div`
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: linear-gradient(135deg, #d4fc79, #96e6a1);
  min-height: 100vh;
`;

const Header = styled(motion.div)`
  background: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 10px;
`;

const Button = styled.button`
  background: ${({ color }) => color};
  color: white;
  padding: 12px 25px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    background: ${({ hoverColor }) => hoverColor || "#444"};
  }
`;

const InputContainer = styled(motion.div)`
  display: flex;
  margin-top: 20px;
  width: 80%;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  border: 2px solid white;
  outline: none;
  transition: all 0.3s ease-in-out;
`;

const AddTaskButton = styled(Button)`
  background: #28a745;
  hoverColor: #1e7e34;
`;

const TaskList = styled(motion.div)`
  margin-top: 20px;
  width: 80%;
`;

const TaskItem = styled(motion.div)`
  background: white;
  padding: 15px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;

  
`;

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');

  const addTask = () => {
    if (newTask.trim()) {
      const now = new Date();
      const deadline = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours from now

      setTasks([...tasks, {
        id: tasks.length + 1,
        name: newTask,
        completed: false,
        createdAt: now,
        deadline: deadline
      }]);
      setNewTask('');
    }
  };

  const filteredTasks = tasks.filter(task => {
    const now = new Date();
    if (filter === 'today') {
      return new Date(task.createdAt).toDateString() === now.toDateString();
    } else if (filter === 'pending') {
      return !task.completed;
    } else if (filter === 'overdue') {
      return !task.completed && new Date(task.deadline) < now;
    }
    return true;
  });

  return (
    <Container>
      <Header initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
        <h1>Todo App ✨</h1>
        <ButtonContainer>
          <Button color="#007bff" hoverColor="#0056b3" onClick={() => setFilter('today')}>Today ☀️</Button>
          <Button color="#ffc107" hoverColor="#c79100" onClick={() => setFilter('pending')}>Pending ⏳</Button>
          <Button color="#dc3545" hoverColor="#a71d2a" onClick={() => setFilter('overdue')}>Overdue ❗</Button>
        </ButtonContainer>
      </Header>

      <InputContainer>
        <Input type="text" placeholder="Add a new task..." value={newTask} onChange={(e) => setNewTask(e.target.value)} />
        <AddTaskButton onClick={addTask}>Add Task</AddTaskButton>
      </InputContainer>

      <TaskList initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}>
        {filteredTasks.map((task) => (
          <TaskItem >
            <span>{task.name}</span>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => {
                setTasks(tasks.map(t =>
                  t.id === task.id ? { ...t, completed: !t.completed } : t
                ));
              }}
            />
          </TaskItem>
        ))}
      </TaskList>
    </Container>
  );
}

export default App;


