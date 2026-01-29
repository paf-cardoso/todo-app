import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:5000';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Carregar tarefas ao montar o componente
  useEffect(() => {
    fetchTasks();
  }, []);

  // Buscar todas as tarefas
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/tasks`);
      setTasks(response.data);
      setError('');
    } catch (err) {
      setError('Erro ao carregar tarefas. Verifique se o backend está a correr.');
      console.error('Erro:', err);
    } finally {
      setLoading(false);
    }
  };

  // Adicionar nova tarefa
  const addTask = async (e) => {
    e.preventDefault();
    
    if (!newTask.trim()) {
      setError('Por favor, insira uma tarefa');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/tasks`, {
        title: newTask
      });
      setTasks([response.data, ...tasks]);
      setNewTask('');
      setError('');
    } catch (err) {
      setError('Erro ao adicionar tarefa');
      console.error('Erro:', err);
    }
  };

  // Marcar tarefa como concluída/não concluída
  const toggleTask = async (id, completed) => {
    try {
      const response = await axios.patch(`${API_URL}/tasks/${id}`, {
        completed: !completed
      });
      setTasks(tasks.map(task => 
        task._id === id ? response.data : task
      ));
    } catch (err) {
      setError('Erro ao atualizar tarefa');
      console.error('Erro:', err);
    }
  };

  // Remover tarefa
  const deleteTask = async (id) => {
    if (!window.confirm('Tens a certeza que queres eliminar esta tarefa?')) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
      setError('');
    } catch (err) {
      setError('Erro ao remover tarefa');
      console.error('Erro:', err);
    }
  };

  // Estatísticas
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>📝 Lista de Tarefas</h1>
          <div className="stats">
            <span className="stat">Total: {totalTasks}</span>
            <span className="stat completed">Concluídas: {completedTasks}</span>
            <span className="stat pending">Pendentes: {pendingTasks}</span>
          </div>
        </header>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={addTask} className="task-form">
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
                    onClick={() => deleteTask(task._id)}
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
