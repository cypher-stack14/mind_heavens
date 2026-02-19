# Backend Implementation Guide

## Overview
The backend API is fully implemented with all required endpoints for the mental health platform.

## Architecture

```
Backend API (Node.js/Express)
├── Routes
│   ├── /api/auth - Authentication (OTP, Google OAuth)
│   └── /api/features - Features (dashboard, assessment, therapists, bookings)
├── Controllers - Business logic for each endpoint
├── Models - MongoDB schemas (User, Assessment, Therapist, Booking, CheckIn)
├── Middleware - Authentication, error handling
└── Database - MongoDB connection and configuration
```

## Implemented Endpoints

### Authentication Routes (`/api/auth`)
- `POST /send-otp` - Send OTP to phone number
- `POST /verify-otp` - Verify OTP and login
- `POST /google` - Google OAuth login
- `POST /logout` - Logout user

### Feature Routes (`/api/features`)

#### Dashboard
- `GET /dashboard` - Get user's dashboard metrics
  - Returns: wellnessScore, checkInStreak, assessmentCount, courseCount, sleepSessions, gamesPlayed

#### Check-ins
- `POST /checkin` - Create a quick check-in
- `GET /checkin/history` - Get check-in history

#### Assessment
- `POST /assessment` - Submit assessment answers
  - Body: `{ answers, score, date }`
  - Returns: Assessment record with wellness feedback
- `GET /assessments` - Get user's assessment history

#### Therapists & Bookings
- `GET /therapists` - Get list of available therapists
  - Query params: `specialty`, `minRating`
  - Returns: Array of therapist objects
- `POST /bookings` - Create a therapy booking
  - Body: `{ therapistId, date, time, sessionType, concerns }`
  - Returns: Booking confirmation
- `GET /bookings` - Get user's bookings

#### Courses
- `POST /course/start` - Start a course

#### Games
- `POST /game/play` - Record game play

#### Resources
- `POST /resource/access` - Log resource access

## Setup Instructions

### Prerequisites
- Node.js (v16+)
- MongoDB (local or cloud)
- Environment variables configured

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
Create `.env` file with:
```
NODE_ENV=development
PORT=5001
MONGODB_URI=mongodb://localhost:27017/mental-health-app
JWT_SECRET=your_jwt_secret_key

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_REDIRECT_URI=http://localhost:5001/api/auth/google/callback

TWILIO_ENABLED=false
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890
```

### 3. Start MongoDB
**Local MongoDB:**
```bash
mongod
```

**MongoDB Atlas (Cloud):**
Update `MONGODB_URI` with your cloud connection string

### 4. Seed Sample Data
Populate the database with sample therapists:
```bash
npm run seed
```

This will:
- Create 6 sample therapists with specialties, ratings, and availability
- Skip if therapists already exist
- Output confirmation of seeded records

### 5. Start Backend Server
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Server runs on `http://localhost:5001`

## Testing the Endpoints

### 1. Authentication Flow

**Send OTP:**
```bash
curl -X POST http://localhost:5001/api/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber": "+1234567890"}'
```

**Verify OTP:**
```bash
curl -X POST http://localhost:5001/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber": "+1234567890", "otp": "123456"}'
```

**Response contains JWT token - use in Authorization header for other requests**

### 2. Get Dashboard
```bash
curl -X GET http://localhost:5001/api/features/dashboard \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 3. Get Therapists
```bash
curl -X GET "http://localhost:5001/api/features/therapists?specialty=Anxiety" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 4. Submit Assessment
```bash
curl -X POST http://localhost:5001/api/features/assessment \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "answers": [0, 1, 2, 1, 0, 3, 2, 1],
    "score": 65,
    "date": "2026-02-19"
  }'
```

### 5. Book Therapist
```bash
curl -X POST http://localhost:5001/api/features/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "therapistId": "THERAPIST_ID_HERE",
    "date": "2026-02-25",
    "time": "2:00 PM",
    "sessionType": "video",
    "concerns": "I would like to work on managing anxiety"
  }'
```

Replace `THERAPIST_ID_HERE` with an actual therapist ID from the database.

## Data Models

### User
```json
{
  "phoneNumber": "string",
  "email": "string",
  "googleId": "string",
  "name": "string",
  "wellnessScore": 0-100,
  "checkInStreak": "number",
  "assessmentCount": "number",
  "currentRiskLevel": "low|moderate|high"
}
```

### Assessment
```json
{
  "userId": "ObjectId",
  "type": "wellness",
  "responses": ["array of answers"],
  "score": 0-100,
  "riskLevel": "low|moderate|high",
  "insights": "string",
  "recommendations": ["array of strings"],
  "createdAt": "date"
}
```

### Therapist
```json
{
  "name": "string",
  "title": "string",
  "specialties": ["array"],
  "rating": 0-5,
  "reviews": "number",
  "experience": "string",
  "languages": ["array"],
  "price": "string",
  "acceptsInsurance": "boolean",
  "availability": ["array of time slots"],
  "bio": "string"
}
```

### Booking
```json
{
  "userId": "ObjectId",
  "therapistId": "ObjectId",
  "date": "string (YYYY-MM-DD)",
  "time": "string",
  "sessionType": "video|phone|in-person",
  "concerns": "string",
  "status": "pending|confirmed|completed|cancelled",
  "createdAt": "date"
}
```

## Response Format

All endpoints return JSON with consistent format:

**Success Response:**
```json
{
  "success": true,
  "data": {...},
  "message": "optional message"
}
```

**Error Response:**
```json
{
  "error": "error message"
}
```

## Error Handling

- `400` - Bad Request (invalid data)
- `401` - Unauthorized (missing/invalid token)
- `404` - Not Found (resource doesn't exist)
- `500` - Server Error

## Security Features

- JWT token authentication for all feature endpoints
- Phone verification for OTP flow
- Google OAuth integration
- CORS enabled for frontend origin
- Environment-based configuration
- Input validation on all routes

## Troubleshooting

### "Cannot find module" errors
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### MongoDB connection failed
- Ensure MongoDB is running: `mongod`
- Check MONGODB_URI in .env
- For Atlas: Verify IP whitelist in network settings

### JWT/Auth errors
- Ensure Authorization header format: `Bearer YOUR_TOKEN`
- Token may have expired - re-authenticate
- Check JWT_SECRET matches between frontend and backend

### Therapists not showing up
```bash
# Run seed script
npm run seed
```

## Next Steps

1. **Frontend Integration Test** - Run frontend app and test all flows
2. **Production Deployment** - Set up hosting and production database
3. **Email Notifications** - Add email confirmations for bookings
4. **Payment Processing** - Integrate payment system
5. **Real-time Features** - Add WebSocket for live notifications

## Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Guide](https://mongoosejs.com/)
- [JWT Implementation](https://jwt.io/)
- [CORS Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
