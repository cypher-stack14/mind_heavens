# API Examples & Testing Guide

Quick reference for all Mindhaven API endpoints with curl, JavaScript, and Postman examples.

## Base URL
```
http://localhost:5000/api
```

---

## 🔐 Authentication Endpoints

### 1. Send Phone OTP

**Endpoint**: `POST /auth/send-otp`

**Purpose**: Request an OTP to be sent to a phone number

#### Using cURL
```bash
curl -X POST http://localhost:5000/api/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber": "+1234567890"}'
```

#### Using JavaScript
```javascript
const response = await fetch('http://localhost:5000/api/auth/send-otp', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ phoneNumber: '+1234567890' })
});
const data = await response.json();
console.log(data.otp); // Shows OTP in development
```

#### Using Postman
```
Method: POST
URL: http://localhost:5000/api/auth/send-otp
Headers: Content-Type: application/json
Body (JSON):
{
  "phoneNumber": "+1234567890"
}
```

**Response** (Success):
```json
{
  "success": true,
  "message": "OTP sent successfully",
  "otp": "123456"  // Only shown in development
}
```

---

### 2. Verify Phone OTP & Login

**Endpoint**: `POST /auth/verify-otp`

**Purpose**: Verify OTP and get JWT token

#### Using cURL
```bash
curl -X POST http://localhost:5000/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "+1234567890",
    "otp": "123456"
  }'
```

#### Using JavaScript
```javascript
const response = await fetch('http://localhost:5000/api/auth/verify-otp', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    phoneNumber: '+1234567890',
    otp: '123456'
  })
});
const data = await response.json();
const token = data.token;
localStorage.setItem('authToken', token); // Store for later use
```

#### Using Postman
```
Method: POST
URL: http://localhost:5000/api/auth/verify-otp
Headers: Content-Type: application/json
Body (JSON):
{
  "phoneNumber": "+1234567890",
  "otp": "123456"
}
```

**Response** (Success):
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "User 7890",
    "phoneNumber": "+1234567890",
    "wellnessScore": 70
  }
}
```

---

### 3. Get Current User

**Endpoint**: `GET /auth/me`

**Purpose**: Get authenticated user's profile and stats

**Required**: JWT Token in Authorization header

#### Using cURL
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### Using JavaScript
```javascript
const token = localStorage.getItem('authToken');
const response = await fetch('http://localhost:5000/api/auth/me', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
});
const data = await response.json();
console.log(data.user);
```

#### Using Postman
```
Method: GET
URL: http://localhost:5000/api/auth/me
Headers: 
  Authorization: Bearer YOUR_JWT_TOKEN
  Content-Type: application/json
```

**Response** (Success):
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "User 7890",
    "email": null,
    "phoneNumber": "+1234567890",
    "profileImage": null,
    "wellnessScore": 70,
    "checkInStreak": 5,
    "currentRiskLevel": "low",
    "assessmentCount": 2,
    "courseCount": 1,
    "sleepSessionCount": 0,
    "gamePlayedCount": 3,
    "lastCheckIn": "2024-01-15T10:30:00.000Z",
    "lastAssessment": "2024-01-14T15:20:00.000Z"
  }
}
```

---

### 4. Logout

**Endpoint**: `POST /auth/logout`

**Purpose**: Logout and invalidate token (client-side deletion)

#### Using JavaScript
```javascript
const token = localStorage.getItem('authToken');
await fetch('http://localhost:5000/api/auth/logout', {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${token}` }
});
localStorage.removeItem('authToken'); // Clear token
```

---

## 📋 Feature Endpoints (All Require Auth)

### 5. Create Check-in

**Endpoint**: `POST /features/checkin`

**Purpose**: Record daily mood and emotion check-in

#### Using JavaScript (via apiClient)
```javascript
import apiClient from '@/utils/apiClient';

await apiClient.createCheckIn('good', 'happy', 'Feeling great!', ['wellness']);
```

#### Using cURL
```bash
curl -X POST http://localhost:5000/api/features/checkin \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "mood": "good",
    "emotion": "happy",
    "notes": "Feeling great!",
    "tags": ["wellness", "positive"]
  }'
```

**Request Body**:
```json
{
  "mood": "very_bad | bad | neutral | good | very_good",
  "emotion": "string",
  "notes": "string",
  "tags": ["array", "of", "tags"]
}
```

**Response**:
```json
{
  "success": true,
  "message": "Check-in recorded successfully",
  "checkIn": {
    "_id": "...",
    "userId": "...",
    "mood": "good",
    "emotion": "happy",
    "notes": "Feeling great!",
    "tags": ["wellness", "positive"],
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### 6. Get Check-in History

**Endpoint**: `GET /features/checkin/history?limit=10&skip=0`

**Purpose**: Get user's historical check-ins

#### Using JavaScript
```javascript
const data = await apiClient.getCheckInHistory(10, 0);
console.log(data.checkIns);
```

#### Using cURL
```bash
curl -X GET "http://localhost:5000/api/features/checkin/history?limit=10&skip=0" \
  -H "Authorization: Bearer TOKEN"
```

**Response**:
```json
{
  "checkIns": [
    {
      "_id": "...",
      "userId": "...",
      "mood": "good",
      "emotion": "happy",
      "notes": "...",
      "tags": ["..."],
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "total": 5,
  "limit": 10,
  "skip": 0
}
```

---

### 7. Create Assessment

**Endpoint**: `POST /features/assessment`

**Purpose**: Submit mental health assessment (PHQ-9, etc.)

#### Using JavaScript
```javascript
const responses = {
  q1: 0,  // Little interest or pleasure
  q2: 1,  // Feeling down, depressed
  q3: 2,  // Trouble falling asleep
  q4: 1,  // Feeling tired
  q5: 0,  // Appetite changes
  q6: 2,  // Feeling bad about yourself
  q7: 1,  // Trouble concentrating
  q8: 2,  // Moving slowly or too fast
  q9: 0   // Thoughts of self-harm
};

await apiClient.createAssessment('phq9', responses);
```

#### Using cURL
```bash
curl -X POST http://localhost:5000/api/features/assessment \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "phq9",
    "responses": {
      "q1": 0, "q2": 1, "q3": 2, "q4": 1, "q5": 0,
      "q6": 2, "q7": 1, "q8": 2, "q9": 0
    }
  }'
```

**Response**:
```json
{
  "success": true,
  "message": "Assessment completed successfully",
  "assessment": {
    "_id": "...",
    "userId": "...",
    "type": "phq9",
    "score": 10,
    "riskLevel": "moderate",
    "insights": "Your phq9 score is 10. Risk level: moderate.",
    "recommendations": [
      "Keep up regular check-ins",
      "Practice mindfulness"
    ],
    "responses": { "q1": 0, ... },
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### 8. Get Assessments

**Endpoint**: `GET /features/assessments?type=phq9`

**Purpose**: Get user's assessment history

#### Using JavaScript
```javascript
const allAssessments = await apiClient.getAssessments();
const phq9Only = await apiClient.getAssessments('phq9');
```

---

### 9. Start Course

**Endpoint**: `POST /features/course/start`

**Purpose**: Record starting a course

#### Using JavaScript
```javascript
await apiClient.startCourse('course-intro-to-cbt');
```

---

### 10. Play Game

**Endpoint**: `POST /features/game/play`

**Purpose**: Record game play with score

#### Using JavaScript
```javascript
await apiClient.playGame('memory-game-1', 850);
```

---

### 11. Access Resource

**Endpoint**: `POST /features/resource/access`

**Purpose**: Log resource access (guides, articles, videos)

#### Using JavaScript
```javascript
await apiClient.accessResource('guide-anxiety-101', 'guide');
```

---

### 12. Get Therapists

**Endpoint**: `GET /features/therapists?specialty=depression&minRating=4.0`

**Purpose**: List available therapists with filters

#### Using JavaScript
```javascript
const allTherapists = await apiClient.getTherapists();
const specialists = await apiClient.getTherapists('depression', 4.0);
```

#### Using cURL
```bash
curl -X GET "http://localhost:5000/api/features/therapists?specialty=depression&minRating=4.0" \
  -H "Authorization: Bearer TOKEN"
```

---

### 13. Book Therapist

**Endpoint**: `POST /features/therapist/book`

**Purpose**: Book an appointment with a therapist

#### Using JavaScript
```javascript
await apiClient.bookTherapist(
  'therapist-507f1f77bcf86cd799439011',
  '2024-01-20',      // Date
  '14:00',           // Time
  'Anxious about work'  // Notes
);
```

#### Using cURL
```bash
curl -X POST http://localhost:5000/api/features/therapist/book \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "therapistId": "507f1f77bcf86cd799439011",
    "date": "2024-01-20",
    "time": "14:00",
    "notes": "Anxious about work"
  }'
```

---

### 14. Get User Bookings

**Endpoint**: `GET /features/bookings`

**Purpose**: Get all user's therapy bookings

#### Using JavaScript
```javascript
const bookings = await apiClient.getUserBookings();
```

---

## 🧪 Common Testing Scenarios

### Scenario 1: Complete User Journey
```bash
# 1. Send OTP
curl -X POST http://localhost:5000/api/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber": "+1234567890"}'
# Note the OTP returned (development only)

# 2. Verify OTP
curl -X POST http://localhost:5000/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber": "+1234567890", "otp": "123456"}'
# Save the token returned

# 3. Get User Profile
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer <TOKEN_FROM_STEP_2>"

# 4. Create Check-in
curl -X POST http://localhost:5000/api/features/checkin \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"mood": "good", "emotion": "happy", "notes": "", "tags": []}'

# 5. Create Assessment
curl -X POST http://localhost:5000/api/features/assessment \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"type": "phq9", "responses": {"q1": 0, "q2": 1, "q3": 2, "q4": 1, "q5": 0, "q6": 2, "q7": 1, "q8": 2, "q9": 0}}'

# 6. Get Updated User Profile
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer <TOKEN>"
# Notice assessmentCount increased to 1
```

### Scenario 2: Get user data and check stats
```bash
export TOKEN="your_jwt_token_here"

# Get user with all stats
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer $TOKEN" | jq '.user | {wellnessScore, checkInStreak, assessmentCount, currentRiskLevel}'
```

---

## ❌ Error Responses

### No Token Provided
```json
{
  "error": "No token provided"
}
```

### Invalid Token
```json
{
  "error": "Invalid or expired token"
}
```

### Invalid OTP
```json
{
  "error": "Invalid OTP"
}
```

### Missing Required Fields
```json
{
  "error": "Phone number and OTP are required"
}
```

---

## 💡 Tips & Tricks

1. **Save Token for Testing**: After login, save the token
   ```javascript
   // In browser console
   const token = localStorage.getItem('authToken');
   console.log(token);
   ```

2. **Use Postman Environments**: Store token as variable
   - Set `{{token}}` variable after login
   - Use `Authorization: Bearer {{token}}`

3. **Batch Requests**: Create multiple check-ins
   ```bash
   for i in {1..5}; do
     curl -X POST http://localhost:5000/api/features/checkin \
       -H "Authorization: Bearer $TOKEN" \
       -d '{"mood":"good",...}'
   done
   ```

4. **Monitor MongoDB**: Use MongoDB Compass
   - Connect to `mongodb://localhost:27017`
   - See data being created in real-time

---

## 📚 Quick Reference

| Operation | Method | Endpoint |
|-----------|--------|----------|
| Send OTP | POST | `/auth/send-otp` |
| Verify OTP | POST | `/auth/verify-otp` |
| Get User | GET | `/auth/me` |
| Logout | POST | `/auth/logout` |
| Check-in | POST | `/features/checkin` |
| History | GET | `/features/checkin/history` |
| Assessment | POST | `/features/assessment` |
| Assessments | GET | `/features/assessments` |
| Course | POST | `/features/course/start` |
| Game | POST | `/features/game/play` |
| Resource | POST | `/features/resource/access` |
| Therapists | GET | `/features/therapists` |
| Book | POST | `/features/therapist/book` |
| Bookings | GET | `/features/bookings` |

Happy testing! 🚀
