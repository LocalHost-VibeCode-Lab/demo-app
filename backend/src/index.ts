import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';

const app = express();
const PORT = process.env.PORT || 4000;

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.get('/api/items', async (_req, res) => {
  const result = await pool.query('SELECT * FROM items ORDER BY created_at DESC');
  res.json(result.rows);
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
