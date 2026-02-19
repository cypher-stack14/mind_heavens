import mongoose from 'mongoose';

const therapistSchema = new mongoose.Schema({
  name: String,
  title: String,
  specialties: [String],
  bio: String,
  image: String,
  rating: { type: Number, min: 0, max: 5 },
  reviews: { type: Number, default: 0 },
  experience: String,
  languages: [String],
  price: String,
  acceptsInsurance: { type: Boolean, default: false },
  availability: [String],
  
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Therapist', therapistSchema);
