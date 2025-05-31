// import format from 'pg-format'
import pool from '../../db/config.js'
// import postQuery from '../helpers/filter.js'

export const createRolModel = async (descripcion) => {
    const sqlQuery = 'INSERT INTO rol (descripcion) VALUES ($1) RETURNING *'
    const values = [descripcion]
    const response = await pool.query(sqlQuery, values)
    return response.rows
}

export const readRolModel = async () => {
    const sqlQuery = 'SELECT * FROM rol'
    const response = await pool.query(sqlQuery)
    return response.rows
}

export const updateRolModel = async (descripcion, estado) => {
    const sqlQuery = 'UPDATE rol (descripcion, estado) VALUES ($1, $2) RETURNING *'
    const values = [descripcion, estado]
    const response = await pool.query(sqlQuery, values)
    return response.rows
}
