// import pg from 'pg'
import 'dotenv/config'

// const {DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE} = process.env

// const pool = new pg.Pool({
//     host: DB_HOST,
//     user: DB_USER,
//     password: DB_PASSWORD,
//     database: DB_DATABASE,
//     allowExitOnIdle: true
// })

// const {HOST, USER, PASSWORD, DATABASE} = process.env

// const pool = new pg.Pool({
//     host: HOST,
//     user: USER,
//     password: PASSWORD,
//     database: DATABASE,
//     allowExitOnIdle: true
// })

// pool.query('SELECT NOW()', (err, res)=>{
//     if(err)
//         console.log('Error connecting to DB:', err)
//     else   
//         console.log('🔋 Db-Connected', res.rows[0])
// })

// export default pool

import { Client } from 'pg';

export const client = new Client({
    host: 'aws-0-sa-east-1.pooler.supabase.com',
    port: 6543,
    user: 'postgres.gompsqjkdyhfzvpdegdq',
    password: 'D3s4f10ñ.RED', // No necesitas codificar aquí
    database: 'postgres',
    ssl: { rejectUnauthorized: false }
});



