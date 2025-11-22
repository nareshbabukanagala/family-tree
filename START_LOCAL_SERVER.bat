@echo off
echo ========================================
echo Starting Local Web Server
echo ========================================
echo.
echo Your family tree will open in browser...
echo Press Ctrl+C to stop the server
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Using Node.js server...
    npx http-server -p 8080 -o
    goto :end
)

REM Check if Python is installed
where python >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Using Python server...
    echo.
    echo Opening browser...
    start http://localhost:8080
    python -m http.server 8080
    goto :end
)

REM No server found
echo ERROR: Neither Node.js nor Python is installed!
echo.
echo Please install one of the following:
echo 1. Node.js from https://nodejs.org/
echo 2. Python from https://www.python.org/
echo.
pause
goto :end

:end
