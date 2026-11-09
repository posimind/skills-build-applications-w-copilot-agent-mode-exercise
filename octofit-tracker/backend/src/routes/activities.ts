import { Router } from 'express';
import { Activity } from '../models/index.js';

const router = Router();

router.get('/', async (_request, response) => {
  response.json(await Activity.find().lean());
});

export default router;