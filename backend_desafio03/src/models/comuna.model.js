import pool from '../../db/config.js'

export const createComunaModel = async (descripcion) => {
    const sqlQuery = 'INSERT INTO comuna (descripcion) VALUES ($1) RETURNING *'
    const values = [descripcion]
    const response = await pool.query(sqlQuery, values)
    return response.rows
}

export const readAllComunaModel = async () => {
    const sqlQuery = 'SELECT * FROM comuna'
    const response = await pool.query(sqlQuery)
    return response.rows
}

export const updateComunanModel = async (id, descripcion) => {
    const sqlQuery = 'UPDATE comuna SET descripcion = $2 WHERE id_region = $1 RETURNING *'
    const values = [id, descripcion]
    const response = await pool.query(sqlQuery, values)
    return response.rows
}

export const deleteComunanModel = async (id) => {
    const sqlQuery = 'DELETE from comuna WHERE id_comuna = $1 RETURNING *'
    const values = [id]
    const response = await pool.query(sqlQuery, values)
    return response.rows
}
