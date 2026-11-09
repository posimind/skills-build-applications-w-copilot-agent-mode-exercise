import { Router } from 'express';
import { Team } from '../models/index.js';

const router = Router();

router.get('/', async (_request, response) => {
  response.json(await Team.find().lean());
});

export default router;