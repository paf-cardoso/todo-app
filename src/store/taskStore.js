// STORE ZUSTAND
// Para usar: npm install zustand

import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const useTaskStore = create((set, get) => ({
  tasks: [],
  loading: false,
  error: null,

  // Buscar todas as tarefas
  fetchTasks: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/tasks`);
      set({ tasks: response.data, loading: false });
    } catch (error) {
      set({ 
        error: 'Erro ao carregar tarefas', 
        loading: false 
      });
    }
  },

  // Adicionar tarefa
  addTask: async (title) => {
    try {
      const response = await axios.post(`${API_URL}/tasks`, { title });
      set(state => ({ 
        tasks: [response.data, ...state.tasks],
        error: null 
      }));
      return true;
    } catch (error) {
      set({ error: 'Erro ao adicionar tarefa' });
      return false;
    }
  },

  // Atualizar tarefa
  updateTask: async (id, completed) => {
    try {
      const response = await axios.patch(`${API_URL}/tasks/${id}`, { completed });
      set(state => ({
        tasks: state.tasks.map(task => 
          task._id === id ? response.data : task
        ),
        error: null
      }));
    } catch (error) {
      set({ error: 'Erro ao atualizar tarefa' });
    }
  },

  // Remover tarefa
  deleteTask: async (id) => {
    try {
      await axios.delete(`${API_URL}/tasks/${id}`);
      set(state => ({
        tasks: state.tasks.filter(task => task._id !== id),
        error: null
      }));
    } catch (error) {
      set({ error: 'Erro ao remover tarefa' });
    }
  },

  // Selectors
  getStats: () => {
    const tasks = get().tasks;
    return {
      total: tasks.length,
      completed: tasks.filter(t => t.completed).length,
      pending: tasks.filter(t => !t.completed).length,
    };
  },
}));
