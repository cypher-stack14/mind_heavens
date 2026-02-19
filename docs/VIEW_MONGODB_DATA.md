# How to View MongoDB Data

## Method 1: MongoDB Atlas Web Interface (Recommended)

1. **Go to**: https://cloud.mongodb.com/
2. **Sign in** with your account
3. **Navigate to**: Database → Browse Collections
4. **Database**: `mental-health-app`

### Collections to View:

#### **Users Collection**
- All registered users
- Phone numbers, emails, Google IDs
- Wellness scores and stats
```json
{
  "_id": "ObjectId",
  "phoneNumber": "+1234567890",
  "email": "user@example.com",
  "googleId": "google_user_id",
  "name": "John Doe",
  "wellnessScore": 75,
  "checkInStreak": 5,
  "assessmentCount": 2,
  "createdAt": "2026-02-20T..."
}
```

#### **Assessments Collection**
- Mental health assessment results
- User responses and scores
```json
{
  "_id": "ObjectId",
  "userId": "user_ObjectId",
  "type": "wellness",
  "score": 65,
  "responses": [...],
  "riskLevel": "low",
  "createdAt": "2026-02-20T..."
}
```

#### **Bookings Collection**
- Therapy appointments
```json
{
  "_id": "ObjectId",
  "userId": "user_ObjectId",
  "therapistId": "therapist_ObjectId",
  "date": "2026-02-25",
  "time": "2:00 PM",
  "sessionType": "video",
  "status": "confirmed"
}
```

#### **Therapists Collection**
- Available therapists (6 seeded)

#### **CheckIns Collection**
- Daily check-in history

---

## Method 2: MongoDB Compass (Desktop App)

1. **Download**: https://www.mongodb.com/try/download/compass
2. **Install** MongoDB Compass
3. **Connect** with your connection string:
```
mongodb+srv://Charan:Charan@user1.eemvjnx.mongodb.net/mental-health-app
```
4. **Browse Collections**:
   - Users
   - Assessments
   - Bookings
   - Therapists
   - CheckIns

### Features:
- Visual data explorer
- Query builder
- Export to JSON/CSV
- Document editing
- Performance metrics

---

## Method 3: MongoDB Shell (mongosh)

### Install mongosh:
```powershell
# Using Chocolatey
choco install mongodb-shell

# Or download from: https://www.mongodb.com/try/download/shell
```

### Connect:
```bash
mongosh "mongodb+srv://Charan:Charan@user1.eemvjnx.mongodb.net/mental-health-app"
```

### Common Commands:

#### View All Collections
```bash
show collections
```

#### View All Users
```bash
db.users.find().pretty()
```

#### View Specific User by Phone
```bash
db.users.findOne({ phoneNumber: "+1234567890" })
```

#### View All Assessments
```bash
db.assessments.find().pretty()
```

#### View User's Assessments
```bash
db.assessments.find({ userId: ObjectId("USER_ID") })
```

#### View All Bookings
```bash
db.bookings.find().pretty()
```

#### View Booking with Therapist Details
```bash
db.bookings.aggregate([
  {
    $lookup: {
      from: "therapists",
      localField: "therapistId",
      foreignField: "_id",
      as: "therapist"
    }
  }
])
```

#### Count Documents
```bash
db.users.countDocuments()
db.assessments.countDocuments()
db.bookings.countDocuments()
```

#### Recent 10 Users
```bash
db.users.find().sort({ createdAt: -1 }).limit(10).pretty()
```

#### Find User by Email
```bash
db.users.findOne({ email: "user@example.com" })
```

#### Find User by Google ID
```bash
db.users.findOne({ googleId: "google_user_id" })
```

---

## Method 4: VS Code Extension

1. **Install**: MongoDB for VS Code extension
2. **Connect**: Use connection string
3. **Browse**: Collections directly in VS Code

---

## Method 5: Backend API Logs

### View Real-Time Backend Logs

Your backend terminal shows:
- All incoming API requests
- Database operations
- Authentication attempts
- Errors and warnings

**Terminal Output Example:**
```
🚀 Mindhaven API Server running on port 5001
✓ MongoDB connected successfully
POST /api/auth/send-otp - 200 OK
POST /api/auth/verify-otp - 200 OK
GET /api/features/dashboard - 200 OK
POST /api/features/assessment - 201 Created
```

---

## Quick Queries for Common Tasks

### Check if User Exists
```bash
db.users.findOne({ phoneNumber: "+1234567890" })
```

### Get User's Complete Profile
```bash
# Get user
var user = db.users.findOne({ phoneNumber: "+1234567890" })

# Get their assessments
db.assessments.find({ userId: user._id })

# Get their bookings
db.bookings.find({ userId: user._id })
```

### View Latest Activity
```bash
# Latest 5 assessments
db.assessments.find().sort({ createdAt: -1 }).limit(5)

# Latest 5 bookings
db.bookings.find().sort({ createdAt: -1 }).limit(5)
```

### Delete Test Data
```bash
# Delete specific user
db.users.deleteOne({ phoneNumber: "+1234567890" })

# Delete all test assessments
db.assessments.deleteMany({ userId: ObjectId("user_id") })

# CAUTION: Delete all data (careful!)
db.users.deleteMany({})
db.assessments.deleteMany({})
db.bookings.deleteMany({})
```

---

## Export Data

### From MongoDB Atlas:
1. Go to Collections
2. Select collection
3. Click "Export Collection"
4. Choose JSON or CSV

### From mongosh:
```bash
mongoexport --uri="mongodb+srv://..." --collection=users --out=users.json
```

### From MongoDB Compass:
1. Select documents
2. Right-click → Export
3. Choose format

---

## Monitor Live Activity

### In MongoDB Atlas:
- **Metrics** tab shows real-time operations
- **Performance Advisor** suggests optimizations
- **Real-Time** tab shows current connections

### In Backend:
Add detailed logging to your controllers:
```javascript
console.log('User authenticated:', req.userId);
console.log('Assessment submitted:', { score, riskLevel });
```

---

## Useful Aggregation Queries

### User Statistics
```javascript
db.users.aggregate([
  {
    $group: {
      _id: null,
      totalUsers: { $sum: 1 },
      avgWellnessScore: { $avg: "$wellnessScore" },
      totalAssessments: { $sum: "$assessmentCount" }
    }
  }
])
```

### Assessment Distribution
```javascript
db.assessments.aggregate([
  {
    $group: {
      _id: "$riskLevel",
      count: { $sum: 1 }
    }
  }
])
```

### Booking Stats
```javascript
db.bookings.aggregate([
  {
    $group: {
      _id: "$status",
      count: { $sum: 1 }
    }
  }
])
```
