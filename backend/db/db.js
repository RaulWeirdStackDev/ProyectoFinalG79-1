import postgres from 'postgres'

const sql = postgres({
  host: 'db.gompsqjkdyhfzvpdegdq.supabase.co',
  port: 5432,
  username: 'postgres',
  password: 'EsV07sBBh9TiGvTe',
  database: 'postgres',
  ssl: { rejectUnauthorized: false }
})

export default sql
