import User from '../models/User.js';
import CheckIn from '../models/CheckIn.js';
import Assessment from '../models/Assessment.js';
import Booking from '../models/Booking.js';
import Therapist from '../models/Therapist.js';

// Quick check-in
export const createCheckIn = async (req, res) => {
  try {
    const { mood, emotion, notes, tags } = req.body;
    const userId = req.userId;

    const checkIn = new CheckIn({
      userId,
      mood,
      emotion,
      notes,
      tags: tags || [],
    });

    await checkIn.save();

    // Update user stats
    const user = await User.findById(userId);
    user.checkInStreak += 1;
    user.lastCheckIn = new Date();
    await user.save();

    res.status(201).json({
      success: true,
      message: 'Check-in recorded successfully',
      checkIn,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user's check-in history
export const getCheckInHistory = async (req, res) => {
  try {
    const userId = req.userId;
    const { limit = 10, skip = 0 } = req.query;

    const checkIns = await CheckIn.find({ userId })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip));

    const total = await CheckIn.countDocuments({ userId });

    res.json({
      checkIns,
      total,
      limit: parseInt(limit),
      skip: parseInt(skip),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Start a course
export const startCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.userId;

    const user = await User.findById(userId);
    user.courseCount += 1;
    await user.save();

    res.json({
      success: true,
      message: 'Course started successfully',
      courseId,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Play a mind game
export const playGame = async (req, res) => {
  try {
    const { gameId, score } = req.body;
    const userId = req.userId;

    const user = await User.findById(userId);
    user.gamePlayedCount += 1;
    await user.save();

    res.json({
      success: true,
      message: 'Game played successfully',
      gameId,
      score,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Access a resource
export const accessResource = async (req, res) => {
  try {
    const { resourceId, resourceType } = req.body; // 'guide', 'article', 'video'
    const userId = req.userId;

    // Log resource access (you can store this in a separate collection)
    console.log(`User ${userId} accessed ${resourceType}: ${resourceId}`);

    res.json({
      success: true,
      message: `Accessed ${resourceType} successfully`,
      resourceId,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get therapists list
export const getTherapists = async (req, res) => {
  try {
    const { specialty, minRating = 0 } = req.query;

    let query = {};
    if (specialty) {
      query.specializations = { $in: [specialty] };
    }
    if (minRating) {
      query.rating = { $gte: parseFloat(minRating) };
    }

    const therapists = await Therapist.find(query).limit(20);

    res.json({
      therapists,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Book a therapist appointment
export const bookTherapist = async (req, res) => {
  try {
    const { therapistId, date, time, notes } = req.body;
    const userId = req.userId;

    // Validate therapist exists
    const therapist = await Therapist.findById(therapistId);
    if (!therapist) {
      return res.status(404).json({ error: 'Therapist not found' });
    }

    const booking = new Booking({
      userId,
      therapistId,
      date: new Date(date),
      time,
      notes,
    });

    await booking.save();

    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully',
      booking,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user's bookings
export const getUserBookings = async (req, res) => {
  try {
    const userId = req.userId;

    const bookings = await Booking.find({ userId })
      .populate('therapistId')
      .sort({ date: -1 });

    res.json({
      bookings,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create assessment
export const createAssessment = async (req, res) => {
  try {
    const { type, responses } = req.body;
    const userId = req.userId;

    // Simple scoring logic (can be enhanced)
    let score = 0;
    let riskLevel = 'low';

    if (type === 'phq9') {
      Object.values(responses).forEach((value) => {
        score += parseInt(value) || 0;
      });
      if (score >= 20)
        riskLevel = 'high';
      else if (score >= 10)
        riskLevel = 'moderate';
    }

    const assessment = new Assessment({
      userId,
      type,
      responses,
      score,
      riskLevel,
      insights: `Your ${type} score is ${score}. Risk level: ${riskLevel}.`,
      recommendations: ['Keep up regular check-ins', 'Practice mindfulness'],
    });

    await assessment.save();

    // Update user stats
    const user = await User.findById(userId);
    user.assessmentCount += 1;
    user.currentRiskLevel = riskLevel;
    user.lastAssessment = new Date();
    await user.save();

    res.status(201).json({
      success: true,
      message: 'Assessment completed successfully',
      assessment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user's assessments
export const getAssessments = async (req, res) => {
  try {
    const userId = req.userId;
    const { type } = req.query;

    let query = { userId };
    if (type) {
      query.type = type;
    }

    const assessments = await Assessment.find(query).sort({ createdAt: -1 });

    res.json({
      assessments,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
