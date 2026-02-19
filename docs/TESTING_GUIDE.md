# Frontend-Backend Integration Testing Guide

## Quick Start

### Terminal 1: Start MongoDB
```bash
mongod
```

### Terminal 2: Start Backend
```bash
cd backend
npm run seed          # Seed therapists (one-time setup)
npm run dev           # Start backend server on port 5001
```

### Terminal 3: Start Frontend
```bash
cd front-end
npm run dev           # Start frontend on port 5173
```

## Testing Each Feature

### 1. Phone OTP Authentication
**Frontend:** Click "Sign In" → Navbar modal
1. Enter phone number (any format for development)
2. See dev OTP displayed (or check browser console)
3. Enter OTP and click verify
4. Should see "Sign Out" button appear
5. User data saved in localStorage

**Backend Console:** Should see OTP in console if logging enabled

### 2. Google OAuth
**Frontend:** Click "Sign in with Google" → Google popup
1. Sign in with Google account
2. Should close popup and show user name in navbar
3. User saved to localStorage

**Backend:** Validates Google credential and returns JWT token

### 3. Home Dashboard
**Frontend:** After logging in, view Home page
1. Should show real metrics pulling from API
2. No loading spinner (data loaded)
3. All cards show live data:
   - Wellness score
   - Check-in streak
   - Assessment count
   - Course count
   - Sleep sessions
   - Games played

**Backend:** `GET /api/features/dashboard` returns user stats

### 4. Mental Health Assessment
**Frontend:** Click "Take Assessment" or button on Home
1. Shows 8 questions on different topics
2. Can scroll through with progress bar
3. Must answer all 8 before submitting
4. After submit, shows results screen with score
5. Results include personalized feedback

**Backend:** `POST /api/features/assessment` stores assessment

**Check stored data:**
```bash
# Connect to MongoDB
mongosh
use mental-health-app
db.assessments.findOne()
```

### 5. Therapist Booking
**Frontend:** Click "Book a Therapist"
1. **Step 1:** Select therapist with specialty filter
   - Shows 6 sample therapists
   - Click "Book Appointment"
2. **Step 2:** Enter booking details
   - Choose session type (video/phone/in-person)
   - Pick date
   - Select time from availability
   - Describe concerns
   - Click "Confirm Booking"
3. **Step 3:** Confirmation screen
   - Shows all booking details
   - "Return Home" button

**Backend:** `POST /api/features/bookings` creates booking

**Check bookings:**
```bash
# In MongoDB
db.bookings.find()
```

## Testing Without Frontend

### Using curl commands:

**1. Get OTP**
```bash
curl -X POST http://localhost:5001/api/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber": "+1234567890"}'
```

**2. Verify OTP (use 000000 for testing)**
```bash
curl -X POST http://localhost:5001/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber": "+1234567890", "otp": "000000"}'
```

Response will contain JWT token. Save it.

**3. Get Dashboard (replace TOKEN)**
```bash
curl -X GET http://localhost:5001/api/features/dashboard \
  -H "Authorization: Bearer TOKEN"
```

**4. Get Therapists**
```bash
curl -X GET http://localhost:5001/api/features/therapists \
  -H "Authorization: Bearer TOKEN"
```

**5. Book Therapist (get therapistId from previous call)**
```bash
curl -X POST http://localhost:5001/api/features/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "therapistId": "THERAPIST_ID",
    "date": "2026-02-25",
    "time": "2:00 PM",
    "sessionType": "video",
    "concerns": "Test booking"
  }'
```

**6. Submit Assessment**
```bash
curl -X POST http://localhost:5001/api/features/assessment \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "answers": [0, 1, 2, 1, 0, 3, 2, 1],
    "score": 65,
    "date": "2026-02-19"
  }'
```

## Common Issues & Solutions

### Issue: "Cannot POST /api/features/bookings"
**Solution:** Route may not be updated. Check:
```bash
cd backend
git diff src/routes/featureRoutes.js
```
Verify `/bookings` route is added (not `/therapist/book`)

### Issue: "Cannot GET /api/features/dashboard"
**Solution:** Ensure getDashboard is imported and exported in controller

### Issue: "Therapists not appearing"
**Solution:** 
1. Check if seed ran successfully: `npm run seed`
2. Verify MongoDB is running
3. Check database: `db.therapists.count()`

### Issue: "Frontend can't connect to backend"
**Check:**
- Backend running on port 5001
- Frontend has `.env` with `VITE_API_BASE_URL=http://localhost:5001/api`
- CORS enabled in backend for `http://localhost:5173`

### Issue: "Google OAuth not working"
**Check:**
- Google Client ID in `.env`
- Google Sign-In SDK loaded in `index.html`
- Domain added to Google Cloud Console

## Database Inspection

### Connect to MongoDB
```bash
mongosh
use mental-health-app
```

### View Collections
```bash
show collections
```

### Count records
```bash
db.users.countDocuments()
db.assessments.countDocuments()
db.therapists.countDocuments()
db.bookings.countDocuments()
```

### View sample records
```bash
db.therapists.findOne()
db.assessments.findOne()
db.bookings.findOne()
```

### Delete all test data (be careful!)
```bash
db.users.deleteMany({})
db.assessments.deleteMany({})
db.bookings.deleteMany({})
```

## Performance Testing

### Measure Response Time
```bash
time curl -X GET http://localhost:5001/api/features/dashboard \
  -H "Authorization: Bearer TOKEN"
```

### Load Testing (with Apache Bench)
```bash
# Get all therapists 100 times
ab -n 100 -c 10 -H "Authorization: Bearer TOKEN" \
  http://localhost:5001/api/features/therapists
```

## Logs & Debugging

### Backend Logs
Check terminal where `npm run dev` is running for:
- Server startup messages
- API requests
- Error messages
- Database operations

### Frontend Logs
Open Browser DevTools (F12) and check:
- Console tab for API call logs
- Network tab to see requests/responses
- LocalStorage for token and user data

### Enable Detailed Logging
Update controller to add console logs:
```javascript
console.log('Dashboard request from user:', userId);
console.log('Therapists found:', therapists.length);
```

## Next Steps After Testing

1. **Code Review** - Review all changes made
2. **Commit Changes** - Git commit tested code
3. **Deployment** - Push to production server
4. **Monitoring** - Set up error tracking and logging
5. **Documentation** - Document custom endpoints

## Support

If everything works end-to-end:
- ✅ All 5 features are fully functional
- ✅ Frontend-backend communication working
- ✅ Database operations working
- ✅ Authentication flows working

The platform is ready for further enhancement and deployment!
