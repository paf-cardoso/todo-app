@echo off
echo ========================================
echo  INSTALACAO AUTOMATICA - TO-DO APP
echo ========================================
echo.

echo [1/4] Instalando dependencias do Backend...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ERRO: Falha ao instalar dependencias do backend
    pause
    exit /b 1
)

echo.
echo [2/4] Criando arquivo .env...
if not exist .env (
    copy .env.example .env
    echo ATENCAO: Por favor edite o arquivo backend/.env com suas configuracoes do MongoDB
    echo Pressione qualquer tecla apos editar o arquivo .env...
    pause
)

echo.
echo [3/4] Instalando dependencias do Frontend...
cd ..\frontend
call npm install
if %errorlevel% neq 0 (
    echo ERRO: Falha ao instalar dependencias do frontend
    pause
    exit /b 1
)

echo.
echo [4/4] Instalacao concluida!
echo.
echo ========================================
echo  PROXIMOS PASSOS:
echo ========================================
echo 1. Edite o arquivo backend/.env com suas configuracoes
echo 2. Execute start-app.bat para iniciar a aplicacao
echo ========================================
echo.
pause
