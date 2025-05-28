// import format from 'pg-format'
import pool from '../../db/config.js'
// import postQuery from '../helpers/filter.js'

export const getRolModel = async () => {
    const sqlQuery = 'SELECT * FROM rol'
    const response = await pool.query(sqlQuery)
    return response.rows
}

export const createRolModel = async (descripcion) => {
    const sqlQuery = 'INSERT INTO rol (descripcion) VALUES ($1) RETURNING *'
    const values = [descripcion]
    const response = await pool.query(sqlQuery, values)
    return response.rows
}

