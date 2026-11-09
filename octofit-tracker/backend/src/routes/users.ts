import { Router } from 'express';
import { User } from '../models/index.js';

const router = Router();

router.get('/', async (_request, response) => {
  response.json(await User.find().lean());
});

export default router;