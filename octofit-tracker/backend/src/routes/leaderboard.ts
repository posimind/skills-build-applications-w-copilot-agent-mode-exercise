import { Router } from 'express';
import { LeaderboardEntry } from '../models/index.js';

const router = Router();

router.get('/', async (_request, response) => {
  response.json(await LeaderboardEntry.find().lean());
});

export default router;