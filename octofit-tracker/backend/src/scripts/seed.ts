import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      { username: 'maya.chen', email: 'maya.chen@example.com', firstName: 'Maya', lastName: 'Chen' },
      { username: 'leo.martinez', email: 'leo.martinez@example.com', firstName: 'Leo', lastName: 'Martinez' },
      { username: 'amina.hassan', email: 'amina.hassan@example.com', firstName: 'Amina', lastName: 'Hassan' },
      { username: 'noah.brooks', email: 'noah.brooks@example.com', firstName: 'Noah', lastName: 'Brooks' },
    ]);

    const teams = await Team.create([
      {
        name: 'Morning Miles',
        description: 'A friendly running crew building consistent weekly mileage.',
        members: [users[0]._id, users[1]._id],
      },
      {
        name: 'Peak Performers',
        description: 'A balanced team focused on strength, cardio, and recovery.',
        members: [users[2]._id, users[3]._id],
      },
    ]);

    await User.updateOne({ _id: users[0]._id }, { team: teams[0]._id });
    await User.updateOne({ _id: users[1]._id }, { team: teams[0]._id });
    await User.updateOne({ _id: users[2]._id }, { team: teams[1]._id });
    await User.updateOne({ _id: users[3]._id }, { team: teams[1]._id });

    const now = new Date();
    const day = 24 * 60 * 60 * 1000;
    await Activity.create([
      { user: users[0]._id, type: 'running', durationMinutes: 32, distanceKm: 5.2, calories: 340, points: 52, date: new Date(now.getTime() - day) },
      { user: users[1]._id, type: 'cycling', durationMinutes: 45, distanceKm: 14.5, calories: 410, points: 60, date: new Date(now.getTime() - 2 * day) },
      { user: users[2]._id, type: 'strength', durationMinutes: 40, calories: 280, points: 45, date: new Date(now.getTime() - day) },
      { user: users[3]._id, type: 'walking', durationMinutes: 50, distanceKm: 4.1, calories: 220, points: 38, date: now },
      { user: users[0]._id, type: 'yoga', durationMinutes: 25, calories: 110, points: 25, date: now },
    ]);

    await LeaderboardEntry.create([
      { user: users[0]._id, team: teams[0]._id, points: 410, rank: 1 },
      { user: users[1]._id, team: teams[0]._id, points: 365, rank: 2 },
      { user: users[2]._id, team: teams[1]._id, points: 340, rank: 3 },
      { user: users[3]._id, team: teams[1]._id, points: 295, rank: 4 },
    ]);

    await Workout.create([
      {
        name: 'Beginner Run Intervals',
        description: 'Build aerobic fitness with alternating easy jogs and recovery walks.',
        category: 'cardio',
        difficulty: 'beginner',
        durationMinutes: 30,
        exercises: [{ name: 'Jog and walk intervals', sets: 6, reps: 1 }],
      },
      {
        name: 'Full-Body Strength',
        description: 'A practical strength session using foundational compound movements.',
        category: 'strength',
        difficulty: 'intermediate',
        durationMinutes: 40,
        exercises: [
          { name: 'Bodyweight squat', sets: 3, reps: 12 },
          { name: 'Push-up', sets: 3, reps: 10 },
          { name: 'Dumbbell row', sets: 3, reps: 10 },
        ],
      },
      {
        name: 'Mobility and Recovery',
        description: 'A gentle mobility routine to support recovery after training.',
        category: 'recovery',
        difficulty: 'beginner',
        durationMinutes: 20,
        exercises: [
          { name: 'Hip flexor stretch', sets: 2, reps: 8 },
          { name: 'Thoracic rotation', sets: 2, reps: 8 },
        ],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
