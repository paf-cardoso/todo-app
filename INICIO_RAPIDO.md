# ⚡ GUIA RÁPIDO DE INÍCIO

## 🚀 Iniciar Rapidamente (3 passos)

### Windows:
```bash
1. Duplo clique em: install.bat
2. Edita backend/.env com tuas configurações
3. Duplo clique em: start-app.bat
```

### Mac/Linux:
```bash
1. ./install.sh
2. Edita backend/.env com tuas configurações  
3. ./start-app.sh
```

## 📋 Ou manualmente no VSCode:

### Terminal 1 - Backend:
```bash
cd backend
npm install
cp .env.example .env    # Edita este ficheiro!
npm run dev
```

### Terminal 2 - Frontend:
```bash
cd frontend
npm install
npm run dev
```

## 🌐 Aceder à Aplicação:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 🗄️ MongoDB (escolhe uma opção):

### Opção A - MongoDB Atlas (Cloud - Fácil):
1. Regista-te em: https://www.mongodb.com/cloud/atlas/register
2. Cria cluster gratuito
3. Cria utilizador e password
4. Permite acesso de qualquer IP (0.0.0.0/0)
5. Copia a string de conexão
6. Cola em `backend/.env`:
   ```
   MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/todo-app
   ```

### Opção B - MongoDB Local:
```bash
# Instalar MongoDB
# Windows: https://www.mongodb.com/try/download/community
# Mac: brew install mongodb-community
# Linux: sudo apt-get install mongodb

# Em backend/.env:
MONGODB_URI=mongodb://localhost:27017/todo-app
```

## ❓ Problemas?

Consulta: `GUIA_VSC.md` para ajuda detalhada

## 📚 Ficheiros Úteis:
- `README.md` - Documentação completa
- `GUIA_VSC.md` - Guia detalhado VSCode
- `AUTH_GUIDE.md` - Como adicionar autenticação

---
💡 **Dica:** Mantém ambos os terminais (backend + frontend) abertos!
