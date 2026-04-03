@echo off
title Eventify Platform Launcher
echo ==========================================
echo    Launching Eventify - Student Hub
echo ==========================================
echo.

:: Start Backend
echo [1/3] Starting Backend Server...
start /min cmd /c "cd /d %~dp0backend && npm.cmd run dev"

:: Start Frontend
echo [2/3] Starting Frontend Dev Server...
start /min cmd /c "cd /d %~dp0frontend && npm.cmd run dev"

:: Wait for servers to spin up
echo [3/3] Opening Web Application in Browser...
timeout /t 5 /nobreak > nul

:: Open Browser
start http://localhost:5173

echo.
echo ==========================================
echo    Eventify is now running!
echo    Keep this window open or minimize it.
echo ==========================================
pause
