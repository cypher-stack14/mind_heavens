# ⚡ Mindhaven - Quick Reference Card

Print this out or keep it open while developing!

---

## 🚀 START HERE (2 minutes)

### Windows
```bash
setup.bat
```

### Mac/Linux
```bash
chmod +x setup.sh && ./setup.sh
```

### Manual
```bash
# Terminal 1
mongod

# Terminal 2
cd frontend
npm install && npm run dev

# Terminal 3
cd backend && npm install && npm run dev
```

**Then open**: http://localhost:5173

---

## 📁 Important Files

| File | Purpose |
|------|---------|
| `frontend/src/utils/apiClient.ts` | API calls to backend |
| `frontend/src/app/components/Navbar.tsx` | Login UI |
| `frontend/src/app/pages/Home.tsx` | Dashboard buttons |
| `backend/src/server.js` | API server |
| `backend/src/models/User.js` | User schema |
| `backend/.env` | Server config |
| `frontend/.env` | Frontend config |

---

## 🔌 API Base URL

```
http://localhost:5001/api
```

---

## 🔐 Quick Auth Test

```bash
# 1. Send OTP
curl -X POST http://localhost:5001/api/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber":"+1234567890"}'

# 2. Verify OTP (use OTP from response)
curl -X POST http://localhost:5001/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber":"+1234567890","otp":"123456"}'

# 3. Use returned TOKEN for all requests
curl -X GET http://localhost:5001/api/auth/me \
  -H "Authorization: Bearer TOKEN_HERE"
```

---

## 📋 All Endpoints (15+)

### Auth (No Token Needed)
- `POST /auth/send-otp` - Get OTP
- `POST /auth/verify-otp` - Login
- `POST /auth/google` - Google OAuth

### Auth (Token Required)
- `GET /auth/me` - Get user profile
- `POST /auth/logout` - Logout

### Features (All Need Token)
- `POST /features/checkin` - Mood check-in
- `GET /features/checkin/history` - Check-in history
- `POST /features/assessment` - Submit assessment
- `GET /features/assessments` - View assessments
- `POST /features/course/start` - Start course
- `POST /features/game/play` - Play game
- `POST /features/resource/access` - Access resource
- `GET /features/therapists` - List therapists
- `POST /features/therapist/book` - Book therapist
- `GET /features/bookings` - View bookings

---

## 💻 Frontend Commands

```bash
# Install dependencies
cd frontend
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

---

## 🗄️ Backend Commands

```bash
cd backend

# Install dependencies
npm install

# Start dev server with auto-reload (http://localhost:5000)
npm run dev

# Start server
npm start
```

---

## 🗄️ MongoDB Quick Commands

```bash
# Check if running
mongo --version

# Connect to database
mongo mongodb://localhost:27017/mindhaven

# List databases
show dbs

# Use database
use mindhaven

# Show collections
show collections

# Count users
db.users.countDocuments()

# Find all users
db.users.find()

# Clear all data
db.users.deleteMany({})
db.assessments.deleteMany({})
db.checkins.deleteMany({})
```

---

## 📝 Test Authentication

1. **Open**: http://localhost:5173
2. **Click**: "Sign In"
3. **Enter**: Phone number (any format)
4. **Click**: "Continue with Phone"
5. **Copy**: OTP from success message
6. **Enter**: OTP code
7. **Click**: "Verify OTP"
8. **✅ Logged in!**

---

## 🧪 Test Buttons

After login, test each button:

```
✓ Access Resources     → Success message
✓ Quick Check-in       → Streak increases
✓ Start Tracking       → Success message
✓ Take Assessment      → Go to /assessment
✓ Browse Courses       → Go to /courses
✓ Sleep & Relaxation   → Success message
✓ Book Therapist       → Success message (coming soon)
```

---

## 🔧 Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/mindhaven
JWT_SECRET=your_secret_key
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

---

## 🐛 Common Issues & Fixes

| Problem | Fix |
|---------|-----|
| Port 5000 in use | `netstat -ano \| findstr :5000` then kill |
| Port 5173 in use | Kill or let Vite use next port |
| MongoDB not found | Install from mongodb.com |
| CORS error | Check FRONTEND_URL in backend .env |
| OTP not showing | Check styled message below navbar |
| Can't connect | Make sure both servers running |
| Token invalid | Login again (7 day expiry) |

---

## 📊 Database Collections

```javascript
// Users
{ phoneNumber, name, wellnessScore, checkInStreak, assessmentCount, ... }

// Assessments
{ userId, type: "phq9", score, responses, riskLevel, ... }

// CheckIns
{ userId, mood: "good|bad", emotion, notes, tags, ... }

// Therapists
{ name, specializations, rating, hourlyRate, availability, ... }

// Bookings
{ userId, therapistId, date, time, status, ... }
```

---

## 🔐 JWT Token

**Stored in**: `localStorage.authToken`

**Header**: `Authorization: Bearer TOKEN`

**Expiry**: 7 days

**Payload**:
```javascript
{
  userId: "...",
  iat: 1234567890,
  exp: 1234567890 + (7*24*60*60)
}
```

---

## 📞 API Request Template

```javascript
// JavaScript
const token = localStorage.getItem('authToken');
const response = await fetch('http://localhost:5000/api/endpoint', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({ /* data */ })
});
const data = await response.json();
```

```bash
# cURL
curl -X POST http://localhost:5000/api/endpoint \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"key":"value"}'
```

---

## 🚀 Deploy Commands

### Backend (Railway.app)
```bash
git push railway main
```

### Frontend (Vercel)
```bash
npm run build
vercel deploy
```

---

## 📚 Documentation Files

| File | Read For |
|------|----------|
| SETUP_GUIDE.md | Complete setup & testing |
| API_EXAMPLES.md | All endpoints with examples |
| IMPLEMENTATION_SUMMARY.md | What was built & next steps |
| backend/README.md | Backend-specific docs |
| README_COMPLETE.md | Full project overview |

---

## 💾 Useful Git Commands

```bash
# Check status
git status

# Add all changes
git add .

# Commit
git commit -m "message"

# Push to GitHub
git push origin main

# View logs
git log --oneline
```

---

## 🎯 Next Features to Build

- [ ] Twilio SMS integration
- [ ] Google OAuth setup
- [ ] Assessment UI components
- [ ] Therapist profiles
- [ ] Payment processing
- [ ] Email notifications
- [ ] Real-time chat
- [ ] Mobile app

---

## 🆘 Help Links

- Node.js: https://nodejs.org
- MongoDB: https://mongodb.com
- Express: https://expressjs.com
- React: https://react.dev
- Vite: https://vitejs.dev
- Postman: https://postman.com
- JWT: https://jwt.io

---

## ✅ Pre-Launch Checklist

- [ ] Both servers running
- [ ] MongoDB running
- [ ] Can login with phone OTP
- [ ] Buttons show success messages
- [ ] No errors in console
- [ ] Can logout
- [ ] Token persists on refresh
- [ ] API responds to requests

---

## 🎉 You're Ready!

All systems operational. Start building! 🚀

---

*Last updated: Feb 17, 2026*
