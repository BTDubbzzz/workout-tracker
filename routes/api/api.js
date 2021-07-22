const router = require('express').Router();
const { Workout } = require('../../models');
const mongojs = require('mongojs');

router.get('/workouts', async (req, res) => {
	try {
		const workouts = await Workout.aggregate([]).addFields({
			totalDuration: { $sum: '$exercises.duration' },
		});
		res.status(200).json(workouts);
	} catch (error) {
		console.error(error);
		res.status(500).json(error);
	}
});

router.get('/workouts/range', async (req, res) => {
	try {
		const workouts = await Workout.aggregate([])
			.limit(7)
			.sort({ day: -1 })
			.addFields({ totalDuration: { $sum: '$exercises.duration' } });
		res.status(200).json(workouts);
	} catch (error) {
		console.error(error);
		res.status(500).json(error);
	}
});

router.post('/workouts', async (req, res) => {
	try {
		const newWorkout = await Workout.create(req.body);
		res.status(200).json(newWorkout);
	} catch (error) {
		console.error(error);
		res.status(500).json(error);
	}
});

router.put('/workouts/:id', async (req, res) => {
	try {
		const updatedWorkout = await Workout.where({
			_id: mongojs.ObjectId(req.params.id),
		}).update({
			$push: {
				exercises: [req.body],
			},
		});
		res.status(200).json(updatedWorkout);
	} catch (error) {
		console.error(error);
		res.status(500).json(error);
	}
});

module.exports = router;
