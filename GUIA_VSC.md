# 🎯 Guia Completo: Como Correr no Visual Studio Code

## 📋 Pré-requisitos

Antes de começar, certifica-te que tens instalado:

1. **Node.js** (v18 ou superior)
   - Verifica: `node --version`
   - Download: https://nodejs.org/

2. **MongoDB**
   - **Opção A - MongoDB Local:** https://www.mongodb.com/try/download/community
   - **Opção B - MongoDB Atlas (Cloud - RECOMENDADO):** https://www.mongodb.com/cloud/atlas/register

3. **Visual Studio Code**
   - Download: https://code.visualstudio.com/

4. **Git** (opcional)
   - Download: https://git-scm.com/

---

## 🔧 Passo 1: Descarregar e Extrair o Projeto

### Opção A: Descarregar o arquivo
1. Descarrega o ficheiro `todo-app.tar.gz`
2. Extrai para uma pasta (ex: `C:\Projetos\todo-app` ou `~/Projetos/todo-app`)

### Opção B: Clonar do GitHub (se subiste para o GitHub)
```bash
git clone https://github.com/teu-usuario/todo-app.git
cd todo-app
```

---

## 📂 Passo 2: Abrir no Visual Studio Code

1. Abre o Visual Studio Code
2. `File` → `Open Folder`
3. Seleciona a pasta `todo-app`

---

## 🗄️ Passo 3: Configurar MongoDB

### Opção A: MongoDB Atlas (Cloud - RECOMENDADO para iniciantes)

1. **Criar Conta:**
   - Vai a https://www.mongodb.com/cloud/atlas/register
   - Cria uma conta gratuita

2. **Criar Cluster:**
   - Cria um cluster gratuito (M0 Sandbox)
   - Escolhe a região mais próxima
   - Aguarda alguns minutos pela criação

3. **Configurar Acesso:**
   - Clica em "Database Access" → "Add New Database User"
   - Cria um utilizador (ex: `admin`) e password (guarda isto!)
   - Clica em "Network Access" → "Add IP Address" → "Allow Access from Anywhere" (0.0.0.0/0)

4. **Obter String de Conexão:**
   - Clica em "Connect" no teu cluster
   - Escolhe "Connect your application"
   - Copia a string (algo como: `mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/`)
   - **IMPORTANTE:** Substitui `<password>` pela tua password real!

### Opção B: MongoDB Local

```bash
# Windows (usando Chocolatey)
choco install mongodb

# macOS (usando Homebrew)
brew tap mongodb/brew
brew install mongodb-community

# Linux (Ubuntu/Debian)
sudo apt-get install mongodb

# Iniciar MongoDB
# Windows: MongoDB inicia automaticamente como serviço
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

---

## ⚙️ Passo 4: Configurar o Backend

1. **Abrir Terminal no VSCode:**
   - `Terminal` → `New Terminal` (ou `` Ctrl+` ``)

2. **Navegar para a pasta backend:**
   ```bash
   cd backend
   ```

3. **Instalar dependências:**
   ```bash
   npm install
   ```

4. **Criar arquivo `.env`:**
   ```bash
   # Windows
   copy .env.example .env
   
   # macOS/Linux
   cp .env.example .env
   ```

5. **Editar o arquivo `.env`:**
   
   No VSCode, abre o ficheiro `backend/.env` e configura:

   **Para MongoDB Atlas:**
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://admin:TUA_PASSWORD@cluster0.xxxxx.mongodb.net/todo-app
   ```

   **Para MongoDB Local:**
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/todo-app
   ```

6. **Iniciar o servidor:**
   ```bash
   npm run dev
   ```

   ✅ **Deves ver:**
   ```
   🚀 Servidor rodando na porta 5000
   ✅ Conectado ao MongoDB
   ```

---

## 💻 Passo 5: Configurar o Frontend

1. **Abrir NOVO Terminal no VSCode:**
   - Clica no `+` no painel de terminal
   - Ou `Terminal` → `New Terminal`

2. **Navegar para a pasta frontend:**
   ```bash
   cd frontend
   ```

3. **Instalar dependências:**
   ```bash
   npm install
   ```

4. **Iniciar a aplicação:**
   ```bash
   npm run dev
   ```

   ✅ **Deves ver:**
   ```
   VITE v5.0.8  ready in 500 ms
   ➜  Local:   http://localhost:3000/
   ```

5. **Abrir no Browser:**
   - Abre o browser e vai a: http://localhost:3000
   - Ou pressiona `Ctrl + Clique` no link no terminal

---

## 🎯 Estrutura dos Terminais no VSCode

Deves ter **2 terminais abertos** simultaneamente:

```
Terminal 1 (backend):
~/todo-app/backend $ npm run dev
🚀 Servidor rodando na porta 5000

Terminal 2 (frontend):
~/todo-app/frontend $ npm run dev
➜  Local:   http://localhost:3000/
```

---

## 🐛 Resolução de Problemas

### ❌ Erro: "npm não é reconhecido"
**Solução:** Node.js não está instalado ou não está no PATH
```bash
# Verifica instalação
node --version
npm --version

# Se não funcionar, reinstala Node.js
```

### ❌ Erro: "EADDRINUSE: address already in use :::5000"
**Solução:** A porta 5000 já está em uso

**Windows:**
```bash
# Ver processo na porta 5000
netstat -ano | findstr :5000

# Matar processo (substitui PID)
taskkill /PID 1234 /F
```

**macOS/Linux:**
```bash
# Ver processo na porta 5000
lsof -ti:5000

# Matar processo
lsof -ti:5000 | xargs kill -9
```

### ❌ Erro: "MongoServerError: bad auth"
**Solução:** Password incorreta no MongoDB Atlas
- Verifica se substituíste `<password>` pela password real
- Verifica se a password não tem caracteres especiais (se tiver, codifica-os)

### ❌ Erro: "CORS policy: No 'Access-Control-Allow-Origin'"
**Solução:** Backend não está a correr
- Verifica se o backend está ativo na porta 5000
- Reinicia o backend

### ❌ Frontend não consegue conectar ao backend
**Solução:** Verifica o URL da API no frontend
- Abre `frontend/src/App.jsx`
- Confirma que `API_URL = 'http://localhost:5000'`

---

## 🔄 Como Parar os Servidores

Em cada terminal, pressiona:
- **Windows/Linux:** `Ctrl + C`
- **macOS:** `Cmd + C`

---

## 📱 Extensões Recomendadas do VSCode

Instala estas extensões para melhor experiência:

1. **ES7+ React/Redux/React-Native snippets**
   - Atalhos para React

2. **Prettier - Code formatter**
   - Formatação automática

3. **ESLint**
   - Linting para JavaScript

4. **MongoDB for VS Code**
   - Gerir MongoDB direto no VSCode

5. **Thunder Client** ou **REST Client**
   - Testar API sem sair do VSCode

---

## 🎨 Comandos Úteis no Terminal

```bash
# Ver ficheiros na pasta atual
ls          # macOS/Linux
dir         # Windows

# Navegar entre pastas
cd backend          # Entrar na pasta backend
cd ..              # Voltar uma pasta acima
cd /               # Ir para raiz

# Limpar terminal
clear      # macOS/Linux
cls        # Windows

# Ver histórico de comandos
# Usa setas ↑ ↓
```

---

## 🚀 Próximos Passos

1. **Testa a aplicação:**
   - Adiciona algumas tarefas
   - Marca como concluídas
   - Remove tarefas

2. **Explora o código:**
   - `backend/server.js` - Lógica da API
   - `backend/models/Task.js` - Modelo de dados
   - `frontend/src/App.jsx` - Interface React

3. **Experimenta os extras:**
   - Troca `App.jsx` por `App.react-query.jsx` para usar React Query
   - Troca por `App.zustand.jsx` para usar Zustand
   - Segue o `AUTH_GUIDE.md` para adicionar autenticação

4. **Personaliza:**
   - Muda cores em `App.css`
   - Adiciona novos campos às tarefas
   - Cria novos componentes

---

## 📞 Dicas Finais

- **Mantém ambos os terminais abertos** enquanto desenvolves
- **Guarda ficheiros** com `Ctrl+S` (VSCode recarrega automaticamente)
- **Usa Git** para controlar versões do teu código
- **Lê os erros** no terminal - eles indicam o problema
- **Console do Browser** (F12) também mostra erros do frontend

---

## ✅ Checklist Rápido

- [ ] Node.js instalado
- [ ] MongoDB configurado (Atlas ou local)
- [ ] Projeto extraído e aberto no VSCode
- [ ] Backend: `npm install` → `.env` configurado → `npm run dev`
- [ ] Frontend: `npm install` → `npm run dev`
- [ ] Aplicação abre em http://localhost:3000
- [ ] Consegues adicionar/remover tarefas

---

**🎉 Pronto! Agora tens a aplicação a correr!**

Se tiveres dúvidas, consulta o `README.md` ou os comentários no código.
