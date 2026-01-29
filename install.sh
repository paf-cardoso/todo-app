#!/bin/bash

echo "========================================"
echo " INSTALAÇÃO AUTOMÁTICA - TO-DO APP"
echo "========================================"
echo ""

echo "[1/4] Instalando dependências do Backend..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "ERRO: Falha ao instalar dependências do backend"
    exit 1
fi

echo ""
echo "[2/4] Criando arquivo .env..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo "ATENÇÃO: Por favor edite o arquivo backend/.env com suas configurações do MongoDB"
    echo "Pressione ENTER após editar o arquivo .env..."
    read
fi

echo ""
echo "[3/4] Instalando dependências do Frontend..."
cd ../frontend
npm install
if [ $? -ne 0 ]; then
    echo "ERRO: Falha ao instalar dependências do frontend"
    exit 1
fi

echo ""
echo "[4/4] Instalação concluída!"
echo ""
echo "========================================"
echo " PRÓXIMOS PASSOS:"
echo "========================================"
echo "1. Edite o arquivo backend/.env com suas configurações"
echo "2. Execute ./start-app.sh para iniciar a aplicação"
echo "========================================"
echo ""
