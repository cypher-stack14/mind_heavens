# Mindhaven Backend Setup & Installation Guide

## Overview
This is the backend API server for the Mindhaven mental health platform. It provides:
- JWT-based authentication (Phone OTP & Google OAuth)
- User management and wellness tracking
- Assessment, check-in, and booking functionality
- RESTful API endpoints

## Prerequisites
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (Local or Atlas Cloud) - [Setup Guide](https://www.mongodb.com/)
- **npm** or **yarn**

## Installation

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Setup Environment Variables
Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Edit `.env`:
```env
# MongoDB (Local)
MONGODB_URI=mongodb://localhost:27017/mindhaven

# MongoDB (Atlas Cloud - uncomment to use)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mindhaven

# JWT Secret (generate a strong random string)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Server Config
PORT=5001
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# Google OAuth (Optional - for future integration)
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_REDIRECT_URI=http://localhost:5001/api/auth/google/callback

# Phone OTP Settings
PHONE_AUTH_ENABLED=true
```

### 3. Setup MongoDB (Choose One)

#### Option A: Local MongoDB
```bash
# Install MongoDB Community Edition
# Windows: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/
# Mac: brew install mongodb-community
# Linux: Follow official docs

# Start MongoDB service
mongod
```

#### Option B: MongoDB Atlas (Cloud)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/mindhaven`
4. Update `MONGODB_URI` in `.env`

## Running the Server

### Development Mode (with Hot Reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5001`

## API Documentation

### Base URL
```
http://localhost:5001/api
```

### Authentication Endpoints

#### 1. Send Phone OTP
```
POST /auth/send-otp
Body: { phoneNumber: "+1234567890" }
Response: { success: true, message: "OTP sent", otp: "123456" } // otp only in dev
```

#### 2. Verify Phone OTP & Login
```
POST /auth/verify-otp
Body: { phoneNumber: "+1234567890", otp: "123456" }
Response: { token: "jwt_token", user: {...} }
```

#### 3. Get Current User
```
GET /auth/me
Headers: Authorization: Bearer <token>
Response: { user: {...} }
```

#### 4. Logout
```
POST /auth/logout
Headers: Authorization: Bearer <token>
Response: { success: true, message: "Logged out" }
```

### Feature Endpoints (All Require Authentication)

#### Check-in
```
POST /features/checkin
Body: { mood: "good", emotion: "happy", notes: "...", tags: ["wellness"] }

GET /features/checkin/history?limit=10&skip=0
```

#### Courses
```
POST /features/course/start
Body: { courseId: "course-1" }
```

#### Games
```
POST /features/game/play
Body: { gameId: "game-1", score: 100 }
```

#### Assessments
```
POST /features/assessment
Body: { type: "phq9", responses: {q1: 2, q2: 1, ...} }

GET /features/assessments?type=phq9
```

#### Therapists
```
GET /features/therapists?specialty=depression&minRating=4.0

POST /features/therapist/book
Body: { therapistId: "...", date: "2024-01-15", time: "14:00", notes: "..." }

GET /features/bookings
```

#### Resources
```
POST /features/resource/access
Body: { resourceId: "resource-1", resourceType: "guide" }
```

## Database Structure

### User Collection
```javascript
{
  _id: ObjectId,
  phoneNumber: String,
  email: String,
  name: String,
  wellnessScore: Number (0-100),
  checkInStreak: Number,
  currentRiskLevel: String ("low" | "moderate" | "high"),
  assessmentCount: Number,
  courseCount: Number,
  sleepSessionCount: Number,
  gamePlayedCount: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Assessment Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  type: String ("phq9" | "depression" | "lifestyle" | "cycle"),
  score: Number,
  responses: Object,
  riskLevel: String,
  insights: String,
  recommendations: [String],
  createdAt: Date
}
```

### CheckIn Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  mood: String ("very_bad" | "bad" | "neutral" | "good" | "very_good"),
  emotion: String,
  notes: String,
  tags: [String],
  createdAt: Date
}
```

## Testing with Postman

1. Install [Postman](https://www.postman.com/)
2. Create a new request
3. Test endpoints:

```bash
# Send OTP
POST http://localhost:5001/api/auth/send-otp
{
  "phoneNumber": "+1234567890"
}

# Verify OTP (use the OTP returned from above)
POST http://localhost:5001/api/auth/verify-otp
{
  "phoneNumber": "+1234567890",
  "otp": "123456"
}

# Get Current User (use token from verify response)
GET http://localhost:5001/api/auth/me
Headers: Authorization: Bearer <your_token>
```

## Frontend Integration

The frontend uses `src/utils/apiClient.ts` to communicate with the backend.

### Set Frontend Environment Variables
In frontend `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

## Troubleshooting

### MongoDB Connection Failed
- Ensure MongoDB is running (`mongod`)
- Check connection string in `.env`
- Verify network access (if using Atlas)

### CORS Errors
- Check `FRONTEND_URL` in `.env` matches your frontend URL
- Ensure both servers are running

### Token Expiration
- Tokens expire in 7 days
- User must login again after expiration
- Implement token refresh in production

### Port Already in Use
```bash
# Change PORT in .env or kill existing process
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

## Next Steps

1. ✅ Phone OTP authentication working
2. ✅ Basic feature endpoints setup
3. 📋 TODO: Implement Twilio SMS for production
4. 📋 TODO: Setup Google OAuth
5. 📋 TODO: Add email notifications
6. 📋 TODO: Implement data validation & error handling
7. 📋 TODO: Add unit tests
8. 📋 TODO: Deploy to cloud (Heroku, Railway, Vercel)

## Deployment

### Using Railway.app (Recommended for Beginners)
1. Push backend to GitHub
2. Connect repository to Railway
3. Add MongoDB addon
4. Deploy!

### Using Heroku
```bash
heroku login
heroku create mindhaven-backend
git push heroku main
```

## Support
For issues or questions, check the logs:
```bash
npm run dev
# Check console output for errors
```

## License
MIT
