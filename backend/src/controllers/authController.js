import User from '../models/User.js';
import { OAuth2Client } from 'google-auth-library';
import { generateToken, generatePhoneOTP } from '../utils/auth.js';

// In-memory OTP storage (use Redis in production)
const otpStore = new Map();

// Send OTP to phone number (mock implementation)
export const sendPhoneOTP = async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({ error: 'Phone number is required' });
    }

    const otp = generatePhoneOTP();
    const expiryTime = Date.now() + 10 * 60 * 1000; // 10 minutes

    otpStore.set(phoneNumber, { otp, expiryTime });

    // In production, send via Twilio
    console.log(`📱 OTP for ${phoneNumber}: ${otp} (expires in 10 minutes)`);

    res.json({
      success: true,
      message: 'OTP sent successfully',
      // Remove in production - only for development
      ...(process.env.NODE_ENV === 'development' && { otp }),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Verify OTP and login
export const verifyPhoneOTP = async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;

    if (!phoneNumber || !otp) {
      return res.status(400).json({ error: 'Phone number and OTP are required' });
    }

    const storedOTP = otpStore.get(phoneNumber);

    if (!storedOTP) {
      return res.status(400).json({ error: 'No OTP found for this phone number' });
    }

    if (storedOTP.otp !== otp) {
      return res.status(401).json({ error: 'Invalid OTP' });
    }

    if (Date.now() > storedOTP.expiryTime) {
      return res.status(401).json({ error: 'OTP has expired' });
    }

    // OTP is valid, find or create user
    let user = await User.findOne({ phoneNumber });

    if (!user) {
      user = new User({
        phoneNumber,
        phoneVerified: true,
        name: `User ${phoneNumber.slice(-4)}`, // Default name
      });
      await user.save();
    } else {
      user.phoneVerified = true;
      user.lastCheckIn = new Date();
      await user.save();
    }

    otpStore.delete(phoneNumber); // Remove used OTP

    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        phoneNumber: user.phoneNumber,
        wellnessScore: user.wellnessScore,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Google OAuth login using ID token
export const googleAuth = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({ error: 'Google credential is required' });
    }

    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(401).json({ error: 'Invalid Google token' });
    }

    const googleId = payload.sub;
    const email = payload.email;
    const name = payload.name || 'Google User';
    const profileImage = payload.picture;

    let user = await User.findOne({ googleId });

    if (!user) {
      user = new User({
        googleId,
        email,
        name,
        profileImage,
        phoneVerified: true,
      });
      await user.save();
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'Google login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        wellnessScore: user.wellnessScore,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get current user
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        profileImage: user.profileImage,
        wellnessScore: user.wellnessScore,
        checkInStreak: user.checkInStreak,
        currentRiskLevel: user.currentRiskLevel,
        assessmentCount: user.assessmentCount,
        courseCount: user.courseCount,
        sleepSessionCount: user.sleepSessionCount,
        gamePlayedCount: user.gamePlayedCount,
        lastCheckIn: user.lastCheckIn,
        lastAssessment: user.lastAssessment,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Logout (token invalidation handled client-side)
export const logout = async (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully',
  });
};
