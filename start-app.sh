#!/bin/bash

echo "========================================"
echo " INICIANDO TO-DO APP"
echo "========================================"
echo ""

echo "Iniciando Backend..."
cd backend
npm run dev &
BACKEND_PID=$!

echo "Aguardando backend iniciar..."
sleep 3

echo "Iniciando Frontend..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

echo ""
echo "========================================"
echo " Aplicação iniciada!"
echo "========================================"
echo "Backend: http://localhost:5000"
echo "Frontend: http://localhost:3000"
echo ""
echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"
echo ""
echo "Pressione CTRL+C para parar ambos os servidores"
echo "========================================"

# Função para parar os processos ao pressionar CTRL+C
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT

# Manter o script rodando
wait
