// VERSÃO COM REACT QUERY
// Para usar esta versão, instala: npm install @tanstack/react-query

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:5000';

// Funções API
const fetchTasks = async () => {
  const { data } = await axios.get(`${API_URL}/tasks`);
  return data;
};

const createTask = async (title) => {
  const { data } = await axios.post(`${API_URL}/tasks`, { title });
  return data;
};

const updateTask = async ({ id, completed }) => {
  const { data } = await axios.patch(`${API_URL}/tasks/${id}`, { completed });
  return data;
};

const deleteTask = async (id) => {
  await axios.delete(`${API_URL}/tasks/${id}`);
  return id;
};

function App() {
  const [newTask, setNewTask] = useState('');
  const queryClient = useQueryClient();

  // Query para buscar tarefas
  const { data: tasks = [], isLoading, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  });

  // Mutation para criar tarefa
  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks']);
      setNewTask('');
    },
  });

  // Mutation para atualizar tarefa
  const updateTaskMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks']);
    },
  });

  // Mutation para deletar tarefa
  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries(['tasks']);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    createTaskMutation.mutate(newTask);
  };

  const toggleTask = (id, completed) => {
    updateTaskMutation.mutate({ id, completed: !completed });
  };

  const handleDelete = (id) => {
    if (window.confirm('Tens a certeza?')) {
      deleteTaskMutation.mutate(id);
    }
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  if (isLoading) return <div className="loading">A carregar...</div>;
  if (error) return <div className="error">Erro: {error.message}</div>;

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>📝 Lista de Tarefas</h1>
          <div className="stats">
            <span className="stat">Total: {totalTasks}</span>
            <span className="stat">Concluídas: {completedTasks}</span>
            <span className="stat">Pendentes: {pendingTasks}</span>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="task-form">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Adicionar nova tarefa..."
            className="task-input"
            disabled={createTaskMutation.isPending}
          />
          <button 
            type="submit" 
            className="btn-add"
            disabled={createTaskMutation.isPending}
          >
            {createTaskMutation.isPending ? 'A adicionar...' : 'Adicionar'}
          </button>
        </form>

        <div className="task-list">
          {tasks.length === 0 ? (
            <div className="empty-state">
              <p>🎉 Nenhuma tarefa!</p>
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task._id}
                className={`task-item ${task.completed ? 'completed' : ''}`}
              >
                <div className="task-content">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task._id, task.completed)}
                    className="task-checkbox"
                    disabled={updateTaskMutation.isPending}
                  />
                  <span className="task-title">{task.title}</span>
                </div>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="btn-delete"
                  disabled={deleteTaskMutation.isPending}
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
