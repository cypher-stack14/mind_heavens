import express from 'express';
import {
  createCheckIn,
  getCheckInHistory,
  startCourse,
  playGame,
  accessResource,
  getTherapists,
  bookTherapist,
  getUserBookings,
  createAssessment,
  getAssessments,
} from '../controllers/featureController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Check-in routes
router.post('/checkin', createCheckIn);
router.get('/checkin/history', getCheckInHistory);

// Course routes
router.post('/course/start', startCourse);

// Game routes
router.post('/game/play', playGame);

// Resource routes
router.post('/resource/access', accessResource);

// Therapist routes
router.get('/therapists', getTherapists);
router.post('/therapist/book', bookTherapist);
router.get('/bookings', getUserBookings);

// Assessment routes
router.post('/assessment', createAssessment);
router.get('/assessments', getAssessments);

export default router;
