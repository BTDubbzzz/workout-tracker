const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
	exercises: [
		{
			type: {
				type: String,
				required: 'Choose resistance or cardio',
				trim: true,
			},
			name: {
				type: String,
				required: 'Enter a name for this exercise',
				trim: true,
			},
			weight: {
				type: Number,
			},
			sets: {
				type: Number,
			},
			reps: {
				type: Number,
			},
			duration: {
				type: Number,
			},
			distance: {
				type: Number,
			},
		},
	],
	day: {
		type: Date,
		default: Date.now,
	},
	totalDuration: {
		type: Number,
	},
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
