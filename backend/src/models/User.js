import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    unique: true,
    sparse: true,
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
  },
  password: {
    type: String,
    // Password is optional since we support multiple auth methods
    select: false, // Don't return password in queries by default
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  name: String,
  profileImage: String,
  
  // Authentication
  phoneVerified: { type: Boolean, default: false },
  emailVerified: { type: Boolean, default: false },
  verificationCode: String,
  verificationCodeExpiry: Date,
  
  // User Stats
  wellnessScore: { type: Number, default: 70, min: 0, max: 100 },
  checkInStreak: { type: Number, default: 0 },
  currentRiskLevel: { type: String, enum: ['low', 'moderate', 'high'], default: 'low' },
  
  // Assessment History
  assessmentCount: { type: Number, default: 0 },
  courseCount: { type: Number, default: 0 },
  sleepSessionCount: { type: Number, default: 0 },
  gamePlayedCount: { type: Number, default: 0 },
  bookingCount: { type: Number, default: 0 },
  
  // Last Activity
  lastCheckIn: Date,
  lastAssessment: Date,
  
  // Preferences
  preferences: {
    theme: { type: String, default: 'light' },
    notifications: { type: Boolean, default: true },
  },
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model('User', userSchema);
