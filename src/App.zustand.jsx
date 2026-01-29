// VERSÃO COM ZUSTAND
// Para usar esta versão, instala: npm install zustand

import { useState, useEffect } from 'react';
import { useTaskStore } from './store/taskStore';
import './App.css';

function App() {
  const [newTask, setNewTask] = useState('');
  
  // Zustand hooks
  const { 
    tasks, 
    loading, 
    error, 
    fetchTasks, 
    addTask, 
    updateTask, 
    deleteTask,
    getStats 
  } = useTaskStore();

  const stats = getStats();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    
    const success = await addTask(newTask);
    if (success) {
      setNewTask('');
    }
  };

  const toggleTask = (id, completed) => {
    updateTask(id, !completed);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tens a certeza que queres eliminar esta tarefa?')) {
      deleteTask(id);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>📝 Lista de Tarefas (Zustand)</h1>
          <div className="stats">
            <span className="stat">Total: {stats.total}</span>
            <span className="stat completed">Concluídas: {stats.completed}</span>
            <span className="stat pending">Pendentes: {stats.pending}</span>
          </div>
        </header>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="task-form">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Adicionar nova tarefa..."
            className="task-input"
          />
          <button type="submit" className="btn-add">
            Adicionar
          </button>
        </form>

        {loading ? (
          <div className="loading">A carregar...</div>
        ) : (
          <div className="task-list">
            {tasks.length === 0 ? (
              <div className="empty-state">
                <p>🎉 Nenhuma tarefa por fazer!</p>
                <p className="empty-subtitle">Adiciona uma tarefa para começar</p>
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
                    />
                    <span className="task-title">{task.title}</span>
                  </div>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="btn-delete"
                    title="Eliminar tarefa"
                  >
                    🗑️
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
