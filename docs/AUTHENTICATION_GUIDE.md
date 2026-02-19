# Mindhaven Authentication Guide

## 🎯 Overview

Mindhaven now supports **3 authentication methods**:

1. **📧 Email & Password** (✅ NEW!)
2. **📱 Phone OTP** (SMS)
3. **🔐 Google Sign-In** (OAuth 2.0)

---

## 1. 📧 Email & Password Authentication

### Registration (Sign Up)

**Frontend Flow:**
1. Click "Sign In" button in navbar
2. Modal opens on "Email" tab (default)
3. Click "Sign Up" link at bottom
4. Enter:
   - Name (optional - defaults to email prefix)
   - Email address
   - Password (minimum 6 characters)
5. Click "Sign Up" button

**API Endpoint:**
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "yourpassword",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registration successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "65f1a2b3c4d5e6f7g8h9",
    "name": "John Doe",
    "email": "user@example.com",
    "wellnessScore": 70
  }
}
```

### Login (Sign In)

**Frontend Flow:**
1. Click "Sign In" button in navbar
2. Modal shows "Email" tab (default)
3. Enter:
   - Email address
   - Password
4. Click "Sign In" button

**API Endpoint:**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "65f1a2b3c4d5e6f7g8h9",
    "name": "John Doe",
    "email": "user@example.com",
    "wellnessScore": 75
  }
}
```

### Password Security

- **Hashing:** bcrypt with 10 salt rounds
- **Storage:** Password field has `select: false` (not returned in queries by default)
- **Minimum Length:** 6 characters
- **Validation:** Password required on registration

### Testing Email Auth

```javascript
// Register new user
const response = await fetch('http://localhost:5001/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'test@example.com',
    password: 'test123',
    name: 'Test User'
  })
});

// Login existing user
const loginResponse = await fetch('http://localhost:5001/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'test@example.com',
    password: 'test123'
  })
});
```

---

## 2. 📱 Phone OTP Authentication

### How It Works

1. User enters phone number
2. Backend generates 6-digit OTP
3. **Development:** OTP shown in response
4. **Production:** OTP sent via Twilio SMS
5. User enters OTP
6. Backend verifies and creates/logs in user

### Frontend Flow

1. Click "Sign In" button
2. Switch to "Phone" tab
3. Enter phone number (e.g., `+1 234 567 8900`)
4. Click "Continue with Phone"
5. OTP displayed in yellow box (dev mode)
6. Enter OTP in 6-digit input
7. Click "Verify OTP"

### API Endpoints

#### Send OTP
```http
POST /api/auth/send-otp
Content-Type: application/json

{
  "phoneNumber": "+12345678900"
}
```

**Response:**
```json
{
  "success": true,
  "message": "OTP sent successfully",
  "otp": "123456"  // Only in development mode
}
```

#### Verify OTP
```http
POST /api/auth/verify-otp
Content-Type: application/json

{
  "phoneNumber": "+12345678900",
  "otp": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "65f1a2b3c4d5e6f7g8h9",
    "name": "User 8900",
    "phoneNumber": "+12345678900",
    "wellnessScore": 70
  }
}
```

### OTP Configuration

**Development Mode:**
- OTP visible in API response
- OTP stored in memory (Map)
- Expiry: 10 minutes
- No real SMS sent (Twilio mock)

**Production Mode:**
- OTP sent via Twilio
- OTP hidden from response
- Stored in Redis (recommended)
- Rate limiting required

### Twilio Setup (Production)

1. Create account at https://www.twilio.com/
2. Get Account SID and Auth Token
3. Purchase a phone number
4. Add to `.env`:
```env
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890
```

---

## 3. 🔐 Google Sign-In (OAuth 2.0)

### Status

✅ **Fully Implemented**
- Google Sign-In SDK loaded in HTML
- Backend OAuth verification ready
- Frontend button integrated

### Frontend Flow

1. Click "Sign In" button
2. Scroll to bottom of modal
3. Click "Continue with Google" button
4. Google popup appears
5. Select Google account
6. Auto redirect back to Mindhaven
7. User logged in

### API Endpoint

```http
POST /api/auth/google
Content-Type: application/json

{
  "credential": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjE4MmU0..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Google login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "65f1a2b3c4d5e6f7g8h9",
    "name": "John Doe",
    "email": "john@gmail.com",
    "wellnessScore": 70
  }
}
```

### Google Cloud Configuration

**Current Client ID:**
```
97327593629-s68070ilu69bq35fg73n298nt834v924.apps.googleusercontent.com
```

**Setup Steps:**
1. Go to: https://console.cloud.google.com/
2. Create new project: "Mindhaven"
3. Enable **Google+ API**
4. Create **OAuth 2.0 Client ID**
5. Add authorized origins:
   - `http://localhost:5175` (development)
   - `https://yourdomain.com` (production)
6. Add authorized redirect URIs:
   - `http://localhost:5175`
   - `https://yourdomain.com`

**Update `.env` files:**

Backend (`.env`):
```env
GOOGLE_CLIENT_ID=97327593629-s68070ilu69bq35fg73n298nt834v924.apps.googleusercontent.com
```

Frontend (`.env`):
```env
VITE_GOOGLE_CLIENT_ID=97327593629-s68070ilu69bq35fg73n298nt834v924.apps.googleusercontent.com
```

### Testing Google Sign-In

**Requirements:**
- Valid Google account
- Localhost authorized in Google Console
- Frontend running on http://localhost:5175

**Manual Test:**
1. Start frontend: `cd front-end; npm run dev`
2. Start backend: `cd backend; npm run dev`
3. Open: http://localhost:5175
4. Click "Sign In"
5. Click Google button
6. Select account
7. Check console for token

---

## 🎨 UI Components

### Login Modal Features

- **Tabbed Interface:** Email / Phone selection
- **Auto-switching:** "Sign Up" ↔ "Sign In" links
- **Loading States:** Spinner during API calls
- **Error Messages:** Red alert box for failures
- **Dev Mode Indicators:** Yellow box showing OTP
- **Google Integration:** Auto-rendered button
- **Form Validation:** Disabled submit until valid

### User Display

After login:
- Username shows in navbar
- Logout button (X icon) appears
- User data stored in localStorage
- JWT token stored for API calls

---

## 🔒 Security Features

### JWT Tokens

**Generation:**
```javascript
import jwt from 'jwt-simple';

const token = jwt.encode(
  { userId: user._id, exp: Date.now() + 7200000 },
  process.env.JWT_SECRET
);
```

**Storage:**
- Frontend: `localStorage` (key: `mindhaven_token`)
- Sent in: `Authorization: Bearer <token>` header
- Expiry: 2 hours

### Password Protection

- **Hashed:** bcrypt with 10 rounds
- **Never Returned:** `select: false` in schema
- **Validation:** Min 6 characters
- **No Plain Text:** Never logged or stored unhashed

### Multiple Auth Methods

User model supports all 3 methods:
```javascript
{
  email: "user@example.com",      // Email auth
  password: "hashed_password",     // Email auth
  phoneNumber: "+1234567890",      // Phone auth
  googleId: "google_user_id",      // Google auth
  phoneVerified: true,
  emailVerified: true
}
```

**Conflict Handling:**
- User tries email login but registered with Google → Error message
- User tries phone but email exists → Separate accounts OK (different identifiers)
- Same email for both email and Google → Google creates new entry (by googleId)

---

## 📊 Database Structure

### User Schema

```javascript
{
  // Authentication Identifiers
  phoneNumber: { type: String, unique: true, sparse: true },
  email: { type: String, unique: true, sparse: true },
  googleId: { type: String, unique: true, sparse: true },
  
  // Credentials
  password: { type: String, select: false },
  
  // Profile
  name: String,
  profileImage: String,
  
  // Verification Status
  phoneVerified: { type: Boolean, default: false },
  emailVerified: { type: Boolean, default: false },
  
  // Stats
  wellnessScore: { type: Number, default: 70 },
  checkInStreak: { type: Number, default: 0 },
  assessmentCount: { type: Number, default: 0 },
  
  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}
```

### Query Examples

**Find by Email:**
```javascript
const user = await User.findOne({ email: 'user@example.com' }).select('+password');
```

**Find by Phone:**
```javascript
const user = await User.findOne({ phoneNumber: '+1234567890' });
```

**Find by Google ID:**
```javascript
const user = await User.findOne({ googleId: 'google_user_id' });
```

---

## 🧪 Testing All Methods

### Test Script (Node.js)

```javascript
// 1. Test Email Registration
const emailReg = await fetch('http://localhost:5001/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'test@example.com',
    password: 'test123',
    name: 'Test User'
  })
});
console.log('Email Registration:', await emailReg.json());

// 2. Test Email Login
const emailLogin = await fetch('http://localhost:5001/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'test@example.com',
    password: 'test123'
  })
});
console.log('Email Login:', await emailLogin.json());

// 3. Test Phone OTP
const sendOTP = await fetch('http://localhost:5001/api/auth/send-otp', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ phoneNumber: '+1234567890' })
});
const otpResponse = await sendOTP.json();
console.log('OTP Sent:', otpResponse);

// 4. Verify OTP
const verifyOTP = await fetch('http://localhost:5001/api/auth/verify-otp', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    phoneNumber: '+1234567890',
    otp: otpResponse.otp
  })
});
console.log('OTP Verified:', await verifyOTP.json());
```

### Manual UI Testing

**Email Auth:**
1. ✅ Register new account
2. ✅ Try duplicate email (should fail)
3. ✅ Login with correct password
4. ✅ Login with wrong password (should fail)
5. ✅ Check user appears in MongoDB
6. ✅ Logout and login again

**Phone Auth:**
1. ✅ Enter phone number
2. ✅ See OTP in yellow box
3. ✅ Enter correct OTP
4. ✅ Try wrong OTP (should fail)
5. ✅ Check user in MongoDB
6. ✅ Test "Back" button

**Google Auth:**
1. ✅ Click Google button
2. ✅ Select account
3. ✅ See user logged in
4. ✅ Check MongoDB for googleId
5. ✅ Logout and Google login again

---

## 🔧 Troubleshooting

### Email Auth Issues

**Problem:** Login fails with "Invalid email or password"
- ✅ Check email is registered: `db.users.findOne({ email: 'user@example.com' })`
- ✅ Check password exists: `db.users.findOne({ email: '...' }).select('+password')`
- ✅ Try registering first

**Problem:** Registration fails with "Email already registered"
- ✅ Email already exists in database
- ✅ Use different email or login instead

### Phone Auth Issues

**Problem:** OTP not showing
- ✅ Check `NODE_ENV=development` in backend `.env`
- ✅ Check response includes `otp` field
- ✅ Check backend console logs

**Problem:** OTP verification fails
- ✅ Check OTP hasn't expired (10 minutes)
- ✅ Check phone number matches exactly
- ✅ Try resending OTP

### Google Auth Issues

**Problem:** Button says "Continue with Google" (fallback)
- ✅ Google SDK not loaded yet (wait 2 seconds)
- ✅ Check `index.html` has Google script tag
- ✅ Check network tab for `accounts.google.com` requests

**Problem:** "Unauthorized" error
- ✅ Check `GOOGLE_CLIENT_ID` matches in both frontend and backend
- ✅ Check authorized origins in Google Console
- ✅ Make sure using `http://localhost:5175` exactly

**Problem:** Google popup blocked
- ✅ Enable popups for localhost
- ✅ Try incognito mode
- ✅ Check browser console for errors

### General Auth Issues

**Problem:** User not appearing in navbar after login
- ✅ Check `localStorage` has `mindhaven_token` and `mindhaven_user`
- ✅ Refresh page
- ✅ Check browser console for errors

**Problem:** "401 Unauthorized" on protected routes
- ✅ Token expired (login again)
- ✅ Token invalid (clear localStorage, login again)
- ✅ Check `Authorization` header sent

---

## 📈 Next Steps

### Email Verification

Add email confirmation links:
1. Send email with verification link
2. User clicks link
3. Backend sets `emailVerified: true`

### Password Reset

Add "Forgot Password?" flow:
1. User enters email
2. Backend sends reset link
3. User creates new password

### Social Login Expansion

Add more OAuth providers:
- Facebook Login
- Apple Sign In
- GitHub OAuth

### Two-Factor Authentication

Add 2FA for extra security:
- Email-based 2FA
- SMS-based 2FA
- Authenticator apps (TOTP)

---

## 📚 API Reference

### Base URL
```
Development: http://localhost:5001/api
Production: https://api.yourdomain.com/api
```

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Email registration |
| POST | `/auth/login` | Email login |
| POST | `/auth/send-otp` | Send phone OTP |
| POST | `/auth/verify-otp` | Verify phone OTP |
| POST | `/auth/google` | Google OAuth |
| GET | `/auth/me` | Get current user (protected) |
| POST | `/auth/logout` | Logout (protected) |

### Protected Routes

Add token to headers:
```javascript
headers: {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
}
```

---

## ✅ Summary

### What's Working

✅ **Email & Password Auth** - Full registration and login
✅ **Phone OTP Auth** - SMS code verification (dev mode)
✅ **Google Sign-In** - OAuth 2.0 integration
✅ **JWT Tokens** - Secure session management
✅ **Password Hashing** - bcrypt encryption
✅ **UI Components** - Tabbed modal interface
✅ **Error Handling** - User-friendly messages
✅ **Multiple Auth Methods** - All 3 work independently

### Environment Variables Required

**Backend `.env`:**
```env
PORT=5001
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret-key-change-in-production
GOOGLE_CLIENT_ID=97327593629-s68070ilu69bq35fg73n298nt834v924.apps.googleusercontent.com
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_PHONE_NUMBER=+1234567890
NODE_ENV=development
```

**Frontend `.env`:**
```env
VITE_API_BASE_URL=http://localhost:5001/api
VITE_GOOGLE_CLIENT_ID=97327593629-s68070ilu69bq35fg73n298nt834v924.apps.googleusercontent.com
```

---

**Ready to use all 3 authentication methods!** 🎉
