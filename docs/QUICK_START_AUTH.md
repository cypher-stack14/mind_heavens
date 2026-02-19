# 🚀 Quick Start - Test All Authentication Methods

## Prerequisites

✅ Backend running on http://localhost:5001  
✅ Frontend running on http://localhost:5175  
✅ MongoDB Atlas connected

---

## 🧪 Testing Order

### 1. Test Email Authentication (NEW!)

#### Register New Account
1. Open http://localhost:5175
2. Click **"Sign In"** button (top right)
3. Modal opens - **"Email" tab** should be selected by default
4. Click **"Sign Up"** link at bottom
5. Enter:
   - Name: `Test User`
   - Email: `test@example.com`
   - Password: `test123`
6. Click **"Sign Up"** button
7. ✅ You should be logged in (name appears in navbar)

#### Login with Email
1. Click **Logout** button (if logged in)
2. Click **"Sign In"** again
3. Enter:
   - Email: `test@example.com`
   - Password: `test123`
4. Click **"Sign In"** button
5. ✅ You should be logged in

#### View in MongoDB Atlas
1. Go to https://cloud.mongodb.com/
2. Navigate to: Cluster → Collections → `mental-health-app` → `users`
3. Find user with `email: "test@example.com"`
4. ✅ Check fields:
   - `email`: "test@example.com"
   - `password`: (hashed string)
   - `emailVerified`: true
   - `name`: "Test User"

---

### 2. Test Phone OTP Authentication

#### Send & Verify OTP
1. Click **"Sign In"** button
2. Switch to **"Phone"** tab
3. Enter phone number: `+1234567890`
4. Click **"Continue with Phone"**
5. ✅ Yellow box appears with OTP (dev mode)
6. Copy the 6-digit OTP shown
7. Enter OTP in the input field
8. Click **"Verify OTP"**
9. ✅ You should be logged in

#### View in MongoDB Atlas
1. Refresh Collections view
2. Find user with `phoneNumber: "+1234567890"`
3. ✅ Check fields:
   - `phoneNumber`: "+1234567890"
   - `phoneVerified`: true
   - `name`: "User 7890" (auto-generated)

---

### 3. Test Google Sign-In

#### Google OAuth Flow
1. Click **"Sign In"** button
2. Scroll to bottom of modal
3. Look for **"Or continue with"** divider
4. ✅ Google button should render below divider
5. Click **"Sign in with Google"** button
6. Google popup appears - select account
7. ✅ Popup closes, you're logged in
8. ✅ Name from Google account appears in navbar

#### View in MongoDB Atlas
1. Refresh Collections view
2. Find user with `googleId: "..."` field
3. ✅ Check fields:
   - `googleId`: (unique Google ID)
   - `email`: (from Google)
   - `name`: (from Google)
   - `profileImage`: (Google profile pic URL)

---

## 🔍 Verify All 3 Users in Database

### MongoDB Query
```javascript
// View all users
db.users.find().pretty()

// Count users by auth method
db.users.countDocuments({ email: { $exists: true, $ne: null } })  // Email auth
db.users.countDocuments({ phoneNumber: { $exists: true } })        // Phone auth
db.users.countDocuments({ googleId: { $exists: true } })           // Google auth
```

### Expected Result
You should have 3 separate users:
1. **Email User:** `test@example.com`
2. **Phone User:** `+1234567890`
3. **Google User:** Your Google account

---

## 📊 Backend Logs

### Check Terminal Output

Your backend terminal should show:
```
🚀 Mindhaven API Server running on port 5001
✓ MongoDB connected successfully

POST /api/auth/register - 200 OK
POST /api/auth/login - 200 OK
POST /api/auth/send-otp - 200 OK
POST /api/auth/verify-otp - 200 OK
POST /api/auth/google - 200 OK
```

---

## 🎯 Testing Checklist

### Email Authentication
- [x] Register new account
- [x] Login with correct password
- [x] Try wrong password (should fail)
- [x] Try duplicate email (should fail)
- [x] Check user in MongoDB
- [x] Logout and login again

### Phone Authentication
- [x] Enter phone number
- [x] See OTP in yellow box (dev mode)
- [x] Verify correct OTP
- [x] Try wrong OTP (should fail)
- [x] Check user in MongoDB
- [x] Test "Back" button

### Google Authentication
- [x] Google button renders
- [x] Click and popup opens
- [x] Select Google account
- [x] See logged in user
- [x] Check MongoDB for googleId
- [x] Logout and Google login again

### UI Features
- [x] Tab switching (Email ↔ Phone)
- [x] Toggle between Login ↔ Register
- [x] Loading spinners appear
- [x] Error messages show (red box)
- [x] Success: Modal closes
- [x] User name appears in navbar
- [x] Logout button works

---

## 🛠️ Troubleshooting

### "OTP not showing?"
- Check backend `.env` has `NODE_ENV=development`
- Check browser console for errors
- Backend logs should show: `POST /api/auth/send-otp - 200 OK`

### "Google button won't click?"
- Wait 2 seconds for Google SDK to load
- Check `index.html` has Google script
- Try refreshing page

### "Email login fails?"
- Make sure you registered first
- Password is case-sensitive
- Try registering with different email

### "User not in navbar after login?"
- Check browser console for errors
- Open DevTools → Application → Local Storage
- Should see: `mindhaven_token` and `mindhaven_user`

---

## 📸 What You Should See

### 1. Login Modal - Email Tab
```
┌─────────────────────────────────────┐
│              Mindhaven               │
│          Welcome Back                │
│    Sign in to continue to Mindhaven  │
├─────────────────────────────────────┤
│  [Email] [Phone]                     │
│                                      │
│  Email                               │
│  [you@example.com          ]         │
│                                      │
│  Password                            │
│  [••••••••                 ]         │
│                                      │
│  [      Sign In      ]               │
│                                      │
│  Don't have an account? Sign Up      │
│                                      │
│  ────── Or continue with ──────      │
│                                      │
│  [🔵 Sign in with Google   ]         │
└─────────────────────────────────────┘
```

### 2. Login Modal - Phone Tab
```
┌─────────────────────────────────────┐
│              Mindhaven               │
│          Welcome Back                │
│    Sign in to continue to Mindhaven  │
├─────────────────────────────────────┤
│  [Email] [Phone]                     │
│                                      │
│  Phone Number                        │
│  [📱 +1 (555) 000-0000    ]         │
│                                      │
│  [  Continue with Phone  ]           │
│                                      │
│  ────── Or continue with ──────      │
│                                      │
│  [🔵 Sign in with Google   ]         │
└─────────────────────────────────────┘
```

### 3. OTP Verification
```
┌─────────────────────────────────────┐
│              Mindhaven               │
│          Welcome Back                │
│    Sign in to continue to Mindhaven  │
├─────────────────────────────────────┤
│  Enter OTP                           │
│  [  1  2  3  4  5  6  ]              │
│  We've sent a 6-digit code to        │
│  +1 234 567 8900                     │
│                                      │
│  ⚠️ Dev mode: OTP is 123456          │
│                                      │
│  [     Verify OTP      ]             │
│                                      │
│  [       Back          ]             │
└─────────────────────────────────────┘
```

### 4. Logged In State
```
┌─────────────────────────────────────────────────┐
│  Mindhaven  Home  Assessment  Courses  Games    │
│                                                  │
│                          Test User  [🚪 Logout] │
└─────────────────────────────────────────────────┘
```

---

## ✅ Success Criteria

After testing all 3 methods, you should have:

✅ **3 users in MongoDB** (one per auth method)  
✅ **All login methods working**  
✅ **Logout button functional**  
✅ **User name displayed in navbar**  
✅ **Backend logs show 200 OK responses**  
✅ **No console errors**

---

## 🎉 Next Steps

Once all authentication is working:

1. **Add User Profile Page**
   - Display user stats
   - Edit profile info
   - Change password

2. **Implement Password Reset**
   - "Forgot Password?" link
   - Email reset token
   - New password form

3. **Add Email Verification**
   - Send confirmation email
   - Verification link
   - Mark `emailVerified: true`

4. **Enable Production SMS**
   - Add Twilio credentials
   - Test real SMS sending
   - Add rate limiting

5. **Deploy to Production**
   - Update Google OAuth origins
   - Set secure JWT_SECRET
   - Enable HTTPS
   - Add CORS whitelist

---

**Ready to test!** Open http://localhost:5175 and try all 3 methods! 🚀
