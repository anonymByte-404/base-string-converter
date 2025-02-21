@echo off

if not exist "..\frontend" (
  echo Frontend directory not found!
  exit /b 1
)

cd ..\frontend

echo Installing dependencies...
npm install
if errorlevel 1 (
  echo Failed to install dependencies!
  exit /b 1
)

echo Starting React app...
npm start
if errorlevel 1 (
  echo Failed to start the React app!
  exit /b 1
)
