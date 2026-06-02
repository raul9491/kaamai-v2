@echo off
echo ========================================
echo Starting KaamAI Development Servers
echo ========================================
echo.

echo [1/2] Starting Backend Server (Port 3002)...
cd /d "%~dp0server"
start "KaamAI Backend" cmd /k "node index.js"
timeout /t 2 /nobreak >nul

echo [2/2] Starting Frontend Server (Port 5174)...
cd /d "%~dp0"
start "KaamAI Frontend" cmd /k "npm run dev"

echo.
echo ========================================
echo Both servers starting in new windows!
echo ========================================
echo.
echo Backend:  http://localhost:3002
echo Frontend: http://localhost:5174
echo.
echo Press any key to close this window...
pause >nul
