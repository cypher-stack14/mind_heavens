# Mindhaven - Full Stack Mental Health Platform

Complete setup guide for running the entire Mindhaven application (Frontend + Backend).

## 📊 Project Structure

```
Mindhaven/
├── frontend/              # Frontend (React + TypeScript)
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/    # React components
│   │   │   ├── pages/         # Page components
│   │   │   └── routes.tsx     # Route definitions
│   │   ├── utils/             # Utilities including apiClient.ts
│   │   └── main.tsx
│   ├── package.json
│   └── .env
├── backend/               # Node.js/Express Backend
│   ├── src/
│   │   ├── controllers/   # Business logic
│   │   ├── models/        # MongoDB schemas
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Auth & error handling
│   │   ├── config/        # Database config
│   │   └── server.js      # Entry point
│   ├── package.json
│   └── .env
├── package.json           # Root scripts
└── README.md
```

## 🚀 Quick Start (5 Minutes)

### 1. Install Node.js & MongoDB

**Windows/Mac/Linux:**
- [Download Node.js v16+](https://nodejs.org/) - Includes npm
- [Download MongoDB Community](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free cloud option)

### 2. Start MongoDB
```bash
# Windows - if installed as service, it starts automatically
# Or start manually:
mongod

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

Verify MongoDB is running:
```bash
mongo --version  # Should show version info
```

### 3. Clone/Setup Frontend

```bash
# Install dependencies
cd frontend
npm install

# Create .env file
copy .env.example .env

# Start development server
npm run dev
```

Frontend will be at: `http://localhost:5173`

### 4. Setup & Start Backend

```bash
 # Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
copy .env.example .env

# Start backend server
npm run dev
```

Backend will be at: `http://localhost:5001`

✅ **Both servers are now running!**

## 🧪 Test the Application

### Test Authentication Flow

1. **Open Frontend**: `http://localhost:5173`
2. **Click "Sign In"** button
3. **Enter Phone Number**: Use any format (e.g., `+1234567890`)
4. **Send OTP**: Click "Continue with Phone"
5. **Check Console**: In development, OTP appears in the message
   - Look for blue message: "[DEV] OTP: 123456"
6. **Enter OTP**: Paste the OTP and verify
7. ✅ **You're now logged in!**

### Test Dashboard Features

Once logged in, test these buttons:

| Button | Expected Result |
|--------|-----------------|
| **Access Resources** | Success message "Resources accessed" |
| **Quick Check-in** | Updates check-in streak, success message |
| **Start Tracking** | Creates initial check-in, shows success |
| **Take Assessment** | Navigates to assessment page |
| **Browse Courses** | Navigates to courses page |
| **Sleep & Relaxation** | Shows success message |
| **Book Therapist** | Shows success message (feature coming soon) |

## 📋 API Testing with Postman

1. **Download Postman**: https://www.postman.com/downloads/
2. **Create Collection**: New > Collection > "Mindhaven API"

### Test Endpoints

#### 1️⃣ Send OTP
```
POST http://localhost:5000/api/auth/send-otp

Body (JSON):
{
  "phoneNumber": "+1234567890"
}

Expected Response:
{
  "success": true,
  "message": "OTP sent successfully",
  "otp": "123456"  // Only in development
}
```

#### 2️⃣ Verify OTP
```
POST http://localhost:5000/api/auth/verify-otp

Body (JSON):
{
  "phoneNumber": "+1234567890",
  "otp": "123456"
}

Expected Response:
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "name": "User 7890",
    "phoneNumber": "+1234567890",
    "wellnessScore": 70
  }
}
```

#### 3️⃣ Get Current User
```
GET http://localhost:5000/api/auth/me

Headers:
Authorization: Bearer <your_token_from_step_2>

Expected Response:
{
  "user": {
    "id": "...",
    "name": "User 7890",
    "wellnessScore": 70,
    "checkInStreak": 0,
    ...
  }
}
```

#### 4️⃣ Create Check-in
```
POST http://localhost:5000/api/features/checkin

Headers:
Authorization: Bearer <your_token>

Body (JSON):
{
  "mood": "good",
  "emotion": "happy",
  "notes": "Feeling great today!",
  "tags": ["wellness", "positive"]
}

Expected Response:
{
  "success": true,
  "message": "Check-in recorded successfully",
  "checkIn": { ... }
}
```

#### 5️⃣ Create Assessment
```
POST http://localhost:5000/api/features/assessment

Headers:
Authorization: Bearer <your_token>

Body (JSON):
{
  "type": "phq9",
  "responses": {
    "q1": 0,
    "q2": 1,
    "q3": 2,
    "q4": 1,
    "q5": 0,
    "q6": 2,
    "q7": 1,
    "q8": 2,
    "q9": 0
  }
}

Expected Response:
{
  "success": true,
  "message": "Assessment completed successfully",
  "assessment": {
    "type": "phq9",
    "score": 10,
    "riskLevel": "moderate",
    ...
  }
}
```

## 🔒 Authentication Flow Explained

```
User Login Flow:
┌─────────────────────────────────────┐
│ 1. User enters phone number         │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│ 2. Frontend sends to /auth/send-otp │
│    Backend generates 6-digit OTP    │
│    Stores in memory (10 min expiry) │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│ 3. User receives OTP (dev shows it) │
│    User enters in app               │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│ 4. Frontend sends /auth/verify-otp  │
│    Backend validates OTP            │
│    Creates/finds user in MongoDB    │
│    Generates JWT token              │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│ 5. Frontend stores token in         │
│    localStorage                     │
│    All future requests use token    │
└─────────────────────────────────────┘
```

## 🛠 Environment Variables

### Frontend (`.env`)
```env
VITE_API_URL=http://localhost:5000/api
```

### Backend (`.env`)
```env
# Database
MONGODB_URI=mongodb://localhost:27017/mindhaven

# Server
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# JWT
JWT_SECRET=your_super_secret_key_change_in_production

# OAuth (optional)
GOOGLE_CLIENT_ID=your_id
GOOGLE_CLIENT_SECRET=your_secret
```

## 📱 User Model Schema

```javascript
{
  "_id": ObjectId,
  "phoneNumber": "+1234567890",
  "email": "user@example.com",
  "googleId": null,
  "name": "User 7890",
  "profileImage": null,
  "phoneVerified": true,
  "wellnessScore": 70,
  "checkInStreak": 5,
  "currentRiskLevel": "low",
  "assessmentCount": 3,
  "courseCount": 0,
  "sleepSessionCount": 0,
  "gamePlayedCount": 2,
  "lastCheckIn": "2024-01-15T10:30:00Z",
  "lastAssessment": "2024-01-14T15:20:00Z",
  "preferences": {
    "theme": "light",
    "notifications": true
  },
  "createdAt": "2024-01-10T08:00:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB connection failed | Ensure `mongod` is running. Check `MONGODB_URI` in `.env` |
| CORS errors | Verify `FRONTEND_URL` in backend `.env` matches your frontend URL |
| Port 5000 already in use | Change `PORT` in backend `.env` or kill existing process |
| Port 5173 already in use | Vite will use next available port, check console |
| OTP not appearing in frontend | Check browser console (F12). Must be in development mode. |
| Token invalid errors | Token expires in 7 days. Login again. |
| Can't connect to API | Ensure both servers are running (`npm run dev` in both folders) |

## 🔄 Development Workflow

### Terminal 1: Frontend
```bash
cd /path/to/mindhaven
npm run dev
# Runs on http://localhost:5173
```

### Terminal 2: Backend
```bash
cd /path/to/mindhaven/backend
npm run dev
# Runs on http://localhost:5000
```

### Terminal 3: MongoDB (if running locally)
```bash
mongod
# Runs on mongodb://localhost:27017
```

Or use MongoDB Atlas (cloud) - no terminal needed.

## 📚 Important Files

### Frontend
- **[src/utils/apiClient.ts](src/utils/apiClient.ts)** - API communication
- **[src/app/components/Navbar.tsx](src/app/components/Navbar.tsx)** - Auth UI & logic
- **[src/app/pages/Home.tsx](src/app/pages/Home.tsx)** - Dashboard buttons

### Backend
- **[backend/src/server.js](backend/src/server.js)** - Express server entry
- **[backend/src/controllers/authController.js](backend/src/controllers/authController.js)** - Auth logic
- **[backend/src/controllers/featureController.js](backend/src/controllers/featureController.js)** - Feature logic
- **[backend/src/models/User.js](backend/src/models/User.js)** - User schema

## ✅ Checklist for Full Setup

- [ ] Node.js installed
- [ ] MongoDB installed and running
- [ ] `frontend/.env` created with `VITE_API_URL`
- [ ] `backend/.env` created with all required variables
- [ ] Frontend dependencies installed (`npm install`)
- [ ] Backend dependencies installed (`cd backend && npm install`)
- [ ] Frontend running (`npm run dev` in root)
- [ ] Backend running (`npm run dev` in backend folder)
- [ ] Can access `http://localhost:5173`
- [ ] Can access `http://localhost:5000/api/health`
- [ ] Can login with phone OTP
- [ ] Buttons on home page work (check success messages)

## 🚀 Next Steps

1. **Integrate Twilio for SMS OTP** - Replace mock OTP with real SMS
2. **Setup Google OAuth** - Add Google login option
3. **Build Assessment UI** - Create full assessment questionnaire
4. **Add Database Seeding** - Pre-populate therapists, courses
5. **Implement Email Notifications** - Send confirmations & reminders
6. **Add Error Boundaries** - Better error handling
7. **Deploy to production** - Use Railway, Heroku, or Vercel

## 📞 Support

Check browser console (F12) and backend logs for error details.

---

**Happy coding! 🎉 Your mental health platform is ready to use.**
