@echo off
REM Mindhaven Quick Start Script for Windows
REM This script helps you set up and run the entire application

cls
echo ======================================== 
echo 🚀 Mindhaven Quick Start (Windows)
echo ========================================
echo.

REM Check Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js not found. Please install from https://nodejs.org/
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version') do echo ✓ Node.js found: %%i

REM Check npm
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ npm not found. Please install Node.js with npm
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('npm --version') do echo ✓ npm found: v%%i

REM Check MongoDB
where mongod >nul 2>nul
if %errorlevel% equ 0 (
    echo ✓ MongoDB found (local instance available)
) else (
    echo ⚠ MongoDB not found. Use MongoDB Atlas ^(cloud^) or install locally:
    echo   https://www.mongodb.com/try/download/community
)

echo.
echo 📦 Installing Frontend Dependencies...
cd frontend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Frontend installation failed
    cd ..
    pause
    exit /b 1
)
cd ..

echo.
echo 📦 Installing Backend Dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Backend installation failed
    cd ..
    pause
    exit /b 1
)
cd ..

echo.
echo ⚙️  Setting up Environment Variables...

if not exist "frontend\.env" (
    copy frontend\.env.example frontend\.env
    echo ✓ Created frontend .env
) else (
    echo ✓ Frontend .env already exists
)

if not exist "backend\.env" (
    copy backend\.env.example backend\.env
    echo ✓ Created backend .env
) else (
    echo ✓ Backend .env already exists
)

cls
echo ========================================
echo ✅ Setup Complete!
echo ========================================
echo.
echo 📝 Next steps:
echo.
echo 1. Start MongoDB ^(if using local^):
echo    mongod
echo.
echo 2. In a NEW Command Prompt, start Frontend:
echo    cd frontend
echo    npm run dev
echo.
echo 3. In ANOTHER Command Prompt, start Backend:
echo    cd backend
echo    npm run dev
echo.
echo 4. Open in browser:
echo    http://localhost:5173
echo.
echo 5. Test the app:
echo    - Click 'Sign In'
echo    - Enter any phone number
echo    - Check the terminal/console for OTP
echo    - Enter OTP in the app
echo    - Test dashboard buttons
echo.
echo 📖 For detailed guide, read: docs\SETUP_GUIDE.md
echo.
pause
