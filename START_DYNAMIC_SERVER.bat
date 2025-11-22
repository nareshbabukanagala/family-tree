@echo off
echo ============================================
echo Starting Dynamic Family Tree Server
echo ============================================
echo.
echo Installing dependencies...
call npm install
echo.
echo Starting server...
echo.
echo Server will run on http://localhost:3000
echo Press Ctrl+C to stop
echo.
node server.js
