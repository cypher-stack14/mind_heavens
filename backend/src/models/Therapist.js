import mongoose from 'mongoose';

const therapistSchema = new mongoose.Schema({
  name: String,
  specializations: [String],
  bio: String,
  imageUrl: String,
  rating: { type: Number, min: 0, max: 5 },
  hourlyRate: Number,
  availability: {
    monday: [String],
    tuesday: [String],
    wednesday: [String],
    thursday: [String],
    friday: [String],
    saturday: [String],
    sunday: [String],
  },
  
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Therapist', therapistSchema);
