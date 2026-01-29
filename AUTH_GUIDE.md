# 🔐 Guia de Implementação de Autenticação JWT

Este guia mostra como adicionar autenticação JWT à aplicação To-Do List.

## 📦 Dependências Necessárias

### Backend
```bash
npm install jsonwebtoken bcryptjs
```

### Frontend
```bash
npm install jwt-decode
```

## 🔧 Backend - Implementação

### 1. Criar Modelo de Utilizador

```javascript
// backend/models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
}, {
  timestamps: true
});

// Hash password antes de guardar
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Método para comparar passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', userSchema);
```

### 2. Atualizar Modelo Task para incluir userId

```javascript
// backend/models/Task.js
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});
```

### 3. Criar Middleware de Autenticação

```javascript
// backend/middleware/auth.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'seu_secret_super_seguro';

export const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new Error();
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Por favor, autentica-te' });
  }
};
```

### 4. Adicionar Rotas de Autenticação

```javascript
// backend/routes/auth.js
import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'seu_secret_super_seguro';

// Registar utilizador
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verificar se utilizador já existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email já registado' });
    }

    // Criar utilizador
    const user = new User({ name, email, password });
    await user.save();

    // Gerar token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      token
    });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao registar', error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Encontrar utilizador
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Verificar password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Gerar token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      token
    });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao fazer login', error: error.message });
  }
});

// Obter perfil do utilizador
router.get('/me', auth, async (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email
    }
  });
});

export default router;
```

### 5. Atualizar server.js

```javascript
// backend/server.js
import authRoutes from './routes/auth.js';
import { auth } from './middleware/auth.js';

// Rotas de autenticação (sem middleware)
app.use('/auth', authRoutes);

// Proteger rotas de tasks com middleware
app.get('/tasks', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar tarefas' });
  }
});

app.post('/tasks', auth, async (req, res) => {
  try {
    const { title } = req.body;
    const task = new Task({ 
      title, 
      userId: req.user._id 
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar tarefa' });
  }
});

// Atualizar outras rotas similarmente...
```

## 💻 Frontend - Implementação

### 1. Criar Context de Autenticação

```javascript
// frontend/src/context/AuthContext.jsx
import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchUser = async () => {
    try {
      const response = await axios.get('http://localhost:5000/auth/me');
      setUser(response.data.user);
    } catch (error) {
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const response = await axios.post('http://localhost:5000/auth/login', {
      email,
      password
    });
    const { user, token } = response.data;
    
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setToken(token);
    setUser(user);
  };

  const register = async (name, email, password) => {
    const response = await axios.post('http://localhost:5000/auth/register', {
      name,
      email,
      password
    });
    const { user, token } = response.data;
    
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
```

### 2. Criar Componentes de Login/Registo

```javascript
// frontend/src/components/Login.jsx
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function Login({ onToggle }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      setError('Credenciais inválidas');
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Login</h2>
        {error && <div className="error">{error}</div>}
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <button type="submit">Entrar</button>
        
        <p>
          Não tens conta? <button onClick={onToggle}>Registar</button>
        </p>
      </form>
    </div>
  );
}
```

### 3. Atualizar main.jsx

```javascript
// frontend/src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
```

### 4. Atualizar App.jsx

```javascript
// frontend/src/App.jsx
import { useAuth } from './context/AuthContext';
import Login from './components/Login';
import TaskList from './components/TaskList';

function App() {
  const { user, logout, loading } = useAuth();

  if (loading) {
    return <div>A carregar...</div>;
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div>
      <header>
        <h1>Olá, {user.name}!</h1>
        <button onClick={logout}>Sair</button>
      </header>
      <TaskList />
    </div>
  );
}
```

## 🔒 Variáveis de Ambiente

Adiciona ao `.env`:
```
JWT_SECRET=um_secret_muito_seguro_aqui_123456
```

## ✅ Checklist de Implementação

- [ ] Instalar dependências (jsonwebtoken, bcryptjs)
- [ ] Criar modelo User
- [ ] Atualizar modelo Task com userId
- [ ] Criar middleware de autenticação
- [ ] Criar rotas de auth (register, login)
- [ ] Proteger rotas de tasks
- [ ] Criar AuthContext no frontend
- [ ] Criar componentes Login/Register
- [ ] Atualizar App.jsx
- [ ] Testar fluxo completo

## 🧪 Testar a API

```bash
# Registar
curl -X POST http://localhost:5000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"João","email":"joao@example.com","password":"123456"}'

# Login
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"joao@example.com","password":"123456"}'

# Criar tarefa (com token)
curl -X POST http://localhost:5000/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{"title":"Minha tarefa"}'
```

## 🎯 Próximos Passos

- Adicionar refresh tokens
- Implementar "Lembrar-me"
- Adicionar validação de email
- Implementar recuperação de password
- Adicionar rate limiting
- Implementar 2FA (autenticação de dois fatores)
