import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	team: { type: Schema.Types.ObjectId, ref: 'Team' },
}, { timestamps: true });

const teamSchema = new Schema({
	name: { type: String, required: true, unique: true },
	description: { type: String, required: true },
	members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

const activitySchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	type: { type: String, required: true },
	durationMinutes: { type: Number, required: true, min: 1 },
	distanceKm: { type: Number, min: 0 },
	calories: { type: Number, required: true, min: 0 },
	points: { type: Number, required: true, min: 0 },
	date: { type: Date, required: true },
}, { timestamps: true });

const leaderboardEntrySchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
	points: { type: Number, required: true, min: 0 },
	rank: { type: Number, required: true, min: 1 },
}, { timestamps: true });

const workoutSchema = new Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	category: { type: String, required: true },
	difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
	durationMinutes: { type: Number, required: true, min: 1 },
	exercises: [{
		name: { type: String, required: true },
		sets: { type: Number, min: 1 },
		reps: { type: Number, min: 1 },
	}],
}, { timestamps: true });

export const User = mongoose.model('User', userSchema, 'users');
export const Team = mongoose.model('Team', teamSchema, 'teams');
export const Activity = mongoose.model('Activity', activitySchema, 'activities');
export const LeaderboardEntry = mongoose.model('LeaderboardEntry', leaderboardEntrySchema, 'leaderboard');
export const Workout = mongoose.model('Workout', workoutSchema, 'workouts');