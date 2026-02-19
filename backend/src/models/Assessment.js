import mongoose from 'mongoose';

const assessmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['phq9', 'depression', 'lifestyle', 'cycle'], // Different assessment types
    required: true,
  },
  score: Number,
  responses: mongoose.Schema.Types.Mixed, // Stores individual question responses
  riskLevel: { type: String, enum: ['low', 'moderate', 'high'] },
  insights: String,
  recommendations: [String],
  
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Assessment', assessmentSchema);
