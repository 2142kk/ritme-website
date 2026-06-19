import { Pool } from 'pg'

if (typeof window !== 'undefined') {
  throw new Error('db should only be imported on the server')
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

export const db = {
  query: (text: string, params?: unknown[]) => pool.query(text, params),
  end: () => pool.end(),
};

export default db;
