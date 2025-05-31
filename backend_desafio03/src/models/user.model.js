import pool from '../../db/config.js'
import bcrypt from 'bcryptjs'

export const createUserModel = async (nombre, apellido, email, password)=>{
    const hashedPassword = bcrypt.hashSync(password)
    const sqlQuery = {
        text : 'INSERT INTO usuario (nombre, apellido, email, password) VALUES ($1, $2, $3, $4) RETURNING nombre, apellido, email',
        values: [nombre, apellido, email, hashedPassword]
    }
    console.log(sqlQuery)
    const response = await pool.query(sqlQuery)
    return response.rows[0]
}

export const findUserByEmailModel = async(email)=>{
    const sqlQuery = {
        text : 'SELECT * FROM usuario WHERE email = $1',
        values : [email]
    }
    const response = await pool.query(sqlQuery)
    return response.rows[0] 
}

export const findUserByIdModel = async(id_usuario)=>{
    const sqlQuery = {
        text : 'SELECT * FROM usuario WHERE id_usuario = $1',
        values : [id_usuario]
    }
    const response = await pool.query(sqlQuery)
    return response.rows[0] 
}