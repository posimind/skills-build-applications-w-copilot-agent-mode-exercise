import { Router } from 'express';
import { Workout } from '../models/index.js';

const router = Router();

router.get('/', async (_request, response) => {
  response.json(await Workout.find().lean());
});

export default router;