import express from 'express';
import db, { connectDatabase } from './config/database.js';

const app = express();
const port = Number(process.env.PORT || 8000);

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    database: db.readyState === 1 ? 'connected' : 'disconnected',
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`OctoFit API listening on port ${port}`);
});

void connectDatabase().catch((error: unknown) => {
  console.error('Error connecting to octofit_db:', error);
});
