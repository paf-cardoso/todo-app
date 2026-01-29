# 📝 To-Do List - Full Stack Application

Uma aplicação completa de lista de tarefas desenvolvida com **Node.js**, **Express**, **MongoDB**, e **React**.

## 🚀 Funcionalidades

- ✅ Adicionar novas tarefas
- 📋 Listar todas as tarefas
- ✔️ Marcar tarefas como concluídas/não concluídas
- 🗑️ Remover tarefas
- 📊 Estatísticas (total, concluídas, pendentes)
- 🎨 Interface moderna e responsiva
- ⚡ Feedback visual em tempo real

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **MongoDB** - Base de dados NoSQL
- **Mongoose** - ODM para MongoDB
- **CORS** - Middleware para habilitar CORS

### Frontend
- **React 18** - Biblioteca JavaScript para UI
- **Vite** - Build tool rápido
- **Axios** - Cliente HTTP
- **CSS3** - Estilização

## 📦 Pré-requisitos

Antes de começar, certifica-te de que tens instalado:

- [Node.js](https://nodejs.org/) (v18 ou superior)
- [MongoDB](https://www.mongodb.com/try/download/community) (instalado localmente) ou uma conta no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Git](https://git-scm.com/)

## 🔧 Instalação e Configuração

### 1. Clonar o Repositório

```bash
git clone https://github.com/teu-usuario/todo-app.git
cd todo-app
```

### 2. Configurar o Backend

```bash
cd backend

# Instalar dependências
npm install

# Criar arquivo .env (copiar do .env.example)
cp .env.example .env

# Editar o arquivo .env e configurar a string de conexão do MongoDB
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/todo-app
# Ou para MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/todo-app
```

### 3. Configurar o Frontend

```bash
cd ../frontend

# Instalar dependências
npm install
```

## 🚀 Como Executar

### Opção 1: Executar Separadamente

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
O servidor estará disponível em `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
A aplicação estará disponível em `http://localhost:3000`

### Opção 2: Executar com Script (opcional)

Podes criar um script `start.sh` na raiz do projeto:

```bash
#!/bin/bash

# Iniciar backend em background
cd backend && npm run dev &

# Aguardar 3 segundos
sleep 3

# Iniciar frontend
cd ../frontend && npm run dev
```

Tornar o script executável e rodar:
```bash
chmod +x start.sh
./start.sh
```

## 📡 API Endpoints

### Base URL: `http://localhost:5000`

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/tasks` | Listar todas as tarefas |
| POST | `/tasks` | Criar nova tarefa |
| PATCH | `/tasks/:id` | Atualizar status da tarefa |
| DELETE | `/tasks/:id` | Remover tarefa |

### Exemplos de Requisições

**Criar Tarefa:**
```bash
curl -X POST http://localhost:5000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Comprar leite"}'
```

**Listar Tarefas:**
```bash
curl http://localhost:5000/tasks
```

**Marcar como Concluída:**
```bash
curl -X PATCH http://localhost:5000/tasks/<task_id> \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

**Remover Tarefa:**
```bash
curl -X DELETE http://localhost:5000/tasks/<task_id>
```

## 📁 Estrutura do Projeto

```
todo-app/
├── backend/
│   ├── models/
│   │   └── Task.js          # Modelo do MongoDB
│   ├── .env.example         # Exemplo de configuração
│   ├── package.json         # Dependências do backend
│   └── server.js            # Servidor Express
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx          # Componente principal
│   │   ├── App.css          # Estilos do App
│   │   ├── index.css        # Estilos globais
│   │   └── main.jsx         # Ponto de entrada
│   ├── index.html           # HTML principal
│   ├── package.json         # Dependências do frontend
│   └── vite.config.js       # Configuração do Vite
│
├── .gitignore
└── README.md
```

## 🎨 Screenshots

A aplicação possui:
- Design moderno com gradiente roxo
- Cards de tarefas com hover effects
- Checkbox personalizado
- Estatísticas em tempo real
- Animações suaves
- Design responsivo

## 🐛 Resolução de Problemas

### MongoDB não conecta

**Problema:** Erro ao conectar ao MongoDB
**Solução:**
1. Verifica se o MongoDB está a correr: `mongod` ou `brew services list` (Mac)
2. Confirma a string de conexão no `.env`
3. Para MongoDB Atlas, certifica-te que o IP está na whitelist

### Porta já está em uso

**Problema:** `Error: listen EADDRINUSE: address already in use :::5000`
**Solução:**
```bash
# Linux/Mac
lsof -ti:5000 | xargs kill -9

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### CORS Error

**Problema:** Erro de CORS no browser
**Solução:** Verifica se o backend está configurado com `cors()` e se o frontend está a fazer requisições para o URL correto

## 🚀 Melhorias Futuras (Extras)

- [ ] Implementar **React Query** para cache e gestão de estado
- [ ] Adicionar **Zustand** para estado global
- [ ] Implementar **autenticação JWT**
- [ ] Adicionar filtros (todas, concluídas, pendentes)
- [ ] Implementar pesquisa de tarefas
- [ ] Adicionar datas de vencimento
- [ ] Categorias/tags para tarefas
- [ ] Drag and drop para reordenar
- [ ] Dark mode
- [ ] Testes unitários e de integração

## 📝 Licença

Este projeto está sob a licença MIT.

## 👤 Autor

Desenvolvido como desafio Full-Stack.

---

⭐ Se gostaste deste projeto, dá uma estrela no GitHub!
