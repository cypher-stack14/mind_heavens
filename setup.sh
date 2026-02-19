#!/bin/bash

# Mindhaven Quick Start Script
# This script helps you set up and run the entire application

echo "🚀 Mindhaven Quick Start"
echo "========================================"

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install from https://nodejs.org/"
    exit 1
fi
echo "✓ Node.js found: $(node --version)"

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm not found. Please install Node.js with npm"
    exit 1
fi
echo "✓ npm found: $(npm --version)"

# Check MongoDB (optional)
if command -v mongod &> /dev/null; then
    echo "✓ MongoDB found: $(mongod --version | head -1)"
else
    echo "⚠ MongoDB not found. If using local MongoDB, install from https://www.mongodb.com/"
    echo "  Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas"
fi

echo ""
echo "📦 Installing Frontend Dependencies..."
cd frontend
npm install
cd ..

echo ""
echo "📦 Installing Backend Dependencies..."
cd backend
npm install
cd ..

echo ""
echo "⚙️  Setting up Environment Variables..."

# Frontend .env
if [ ! -f "frontend/.env" ]; then
    cp frontend/.env.example frontend/.env
    echo "✓ Created frontend .env (edit with your API URL if needed)"
fi

# Backend .env
if [ ! -f "backend/.env" ]; then
    cp backend/.env.example backend/.env
    echo "✓ Created backend .env (edit with your MongoDB URI if needed)"
fi

echo ""
echo "========================================"
echo "✅ Setup Complete!"
echo "========================================"
echo ""
echo "📝 Next steps:"
echo ""
echo "1. Start MongoDB (if using local):"
echo "   mongod"
echo ""
echo "2. In a new terminal, start Frontend:"
echo "   cd frontend && npm run dev"
echo ""
echo "3. In another terminal, start Backend:"
echo "   cd backend && npm run dev"
echo ""
echo "4. Open in browser:"
echo "   http://localhost:5173"
echo ""
echo "5. Test the app:"
echo "   - Click 'Sign In'"
echo "   - Enter phone number (any format)"
echo "   - Check console for OTP"
echo "   - Enter OTP"
echo "   - Test dashboard buttons"
echo ""
echo "Need help? Check docs/SETUP_GUIDE.md"
