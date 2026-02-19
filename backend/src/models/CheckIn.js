import mongoose from 'mongoose';

const checkInSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  mood: { type: String, enum: ['very_bad', 'bad', 'neutral', 'good', 'very_good'] },
  emotion: String,
  notes: String,
  tags: [String], // e.g., ['stressed', 'anxious', 'happy']
  
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('CheckIn', checkInSchema);
