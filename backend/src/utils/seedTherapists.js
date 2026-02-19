import mongoose from 'mongoose';
import Therapist from '../models/Therapist.js';
import dotenv from 'dotenv';

dotenv.config();

const seedTherapists = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mental-health-app');
    console.log('✓ Connected to MongoDB');

    // Check if therapists already exist
    const existingCount = await Therapist.countDocuments();
    if (existingCount > 0) {
      console.log(`ℹ Database already has ${existingCount} therapists. Skipping seed.`);
      process.exit(0);
    }

    const therapists = [
      {
        name: 'Dr. Sarah Johnson',
        title: 'Licensed Clinical Psychologist',
        specialties: ['Anxiety', 'Depression', 'Trauma'],
        rating: 4.9,
        reviews: 127,
        experience: '12 years',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600',
        bio: 'Specializing in cognitive behavioral therapy and mindfulness-based approaches to help you overcome anxiety and depression.',
        languages: ['English', 'Spanish'],
        price: '$120/session',
        acceptsInsurance: true,
        availability: ['Today 2:00 PM', 'Today 4:00 PM', 'Tomorrow 10:00 AM', 'Tomorrow 2:00 PM'],
      },
      {
        name: 'Dr. Michael Chen',
        title: 'Licensed Marriage & Family Therapist',
        specialties: ['Relationships', 'Stress', 'Depression'],
        rating: 4.8,
        reviews: 98,
        experience: '10 years',
        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600',
        bio: 'Helping couples and families build stronger connections through evidence-based therapy techniques.',
        languages: ['English', 'Mandarin'],
        price: '$110/session',
        acceptsInsurance: true,
        availability: ['Tomorrow 10:00 AM', 'Tomorrow 3:00 PM', 'Day after 9:00 AM'],
      },
      {
        name: 'Dr. Emily Rodriguez',
        title: 'Licensed Clinical Social Worker',
        specialties: ['Trauma', 'Anxiety', 'Stress'],
        rating: 5.0,
        reviews: 156,
        experience: '15 years',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600',
        bio: 'Trauma-informed care specialist with a compassionate approach to healing and recovery.',
        languages: ['English'],
        price: '$130/session',
        acceptsInsurance: true,
        availability: ['Today 3:00 PM', 'Tomorrow 11:00 AM', 'Tomorrow 5:00 PM'],
      },
      {
        name: 'Dr. James Wilson',
        title: 'Licensed Professional Counselor',
        specialties: ['Life Coaching', 'Career Counseling', 'Relationships'],
        rating: 4.7,
        reviews: 85,
        experience: '8 years',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600',
        bio: 'Helping clients navigate life transitions and achieve their personal and professional goals.',
        languages: ['English', 'French'],
        price: '$100/session',
        acceptsInsurance: true,
        availability: ['Today 1:00 PM', 'Tomorrow 3:00 PM', 'Tomorrow 5:00 PM'],
      },
      {
        name: 'Dr. Lisa Ahmed',
        title: 'Licensed Clinical Psychologist',
        specialties: ['OCD', 'Anxiety', 'Depression'],
        rating: 4.9,
        reviews: 142,
        experience: '11 years',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600',
        bio: 'Specializing in exposure and response prevention therapy for OCD and anxiety disorders.',
        languages: ['English', 'Urdu'],
        price: '$125/session',
        acceptsInsurance: true,
        availability: ['Today 11:00 AM', 'Today 3:00 PM', 'Tomorrow 2:00 PM'],
      },
      {
        name: 'Dr. David Martinez',
        title: 'Licensed Marriage & Family Therapist',
        specialties: ['Family Conflict', 'Parenting', 'Stress'],
        rating: 4.8,
        reviews: 110,
        experience: '9 years',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600',
        bio: 'Expert in family dynamics and helping families communicate more effectively.',
        languages: ['English', 'Spanish'],
        price: '$115/session',
        acceptsInsurance: true,
        availability: ['Tomorrow 9:00 AM', 'Tomorrow 4:00 PM', 'Day after 2:00 PM'],
      },
    ];

    const createdTherapists = await Therapist.insertMany(therapists);
    console.log(`✓ Successfully seeded ${createdTherapists.length} therapists into the database`);
    process.exit(0);
  } catch (error) {
    console.error('✗ Error seeding therapists:', error.message);
    process.exit(1);
  }
};

seedTherapists();
