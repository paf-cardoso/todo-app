import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Task from './models/Task.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/todo-app';

// Middlewares
app.use(cors());
app.use(express.json());

// Conexão com MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('✅ Conectado ao MongoDB'))
  .catch((error) => console.error('❌ Erro ao conectar ao MongoDB:', error));

// Rotas

// GET /tasks - Listar todas as tarefas
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar tarefas', error: error.message });
  }
});

// POST /tasks - Criar nova tarefa
app.post('/tasks', async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({ message: 'O título da tarefa é obrigatório' });
    }

    const task = new Task({ title });
    await task.save();

    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar tarefa', error: error.message });
  }
});

// PATCH /tasks/:id - Marcar tarefa como concluída/não concluída
app.patch('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    const task = await Task.findByIdAndUpdate(
      id,
      { completed: completed !== undefined ? completed : true },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    res.json(task);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar tarefa', error: error.message });
  }
});

// DELETE /tasks/:id - Remover tarefa
app.delete('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    res.json({ message: 'Tarefa removida com sucesso', task });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao remover tarefa', error: error.message });
  }
});

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: '🚀 API To-Do List está funcionando!' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
