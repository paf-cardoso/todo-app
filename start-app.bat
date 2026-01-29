@echo off
echo ========================================
echo  INICIANDO TO-DO APP
echo ========================================
echo.

echo Iniciando Backend...
start "Backend Server" cmd /k "cd backend && npm run dev"

timeout /t 3 /nobreak > nul

echo Iniciando Frontend...
start "Frontend App" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo  Aplicacao iniciada!
echo ========================================
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Pressione CTRL+C em cada janela para parar
echo ========================================
