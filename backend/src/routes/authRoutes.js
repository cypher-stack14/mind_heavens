import express from 'express';
import {
  sendPhoneOTP,
  verifyPhoneOTP,
  googleAuth,
  registerEmail,
  loginEmail,
  getCurrentUser,
  logout,
} from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Auth routes
router.post('/send-otp', sendPhoneOTP);
router.post('/verify-otp', verifyPhoneOTP);
router.post('/google', googleAuth);
router.post('/register', registerEmail);
router.post('/login', loginEmail);
router.get('/me', authenticateToken, getCurrentUser);
router.post('/logout', authenticateToken, logout);

export default router;
