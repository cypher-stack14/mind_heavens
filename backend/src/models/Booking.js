import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  therapistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Therapist',
    required: true,
  },
  date: String,
  time: String,
  sessionType: { type: String, enum: ['video', 'phone', 'in-person'], default: 'video' },
  concerns: String,
  status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'confirmed' },
  
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Booking', bookingSchema);
