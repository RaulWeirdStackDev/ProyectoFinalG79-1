import pool from '../../db/config.js'
import bcrypt from 'bcryptjs'

export const createUserModel = async (nombre, apellido, email, password) => {
  try {
    const hashedPassword = bcrypt.hashSync(password);
    const sqlQuery = {
      text: 'INSERT INTO usuario (nombre, apellido, email, password) VALUES ($1, $2, $3, $4) RETURNING nombre, apellido, email',
      values: [nombre, apellido, email, hashedPassword]
    };
    const response = await pool.query(sqlQuery);
    return response.rows[0];
  } catch (error) {
    console.error('Error en createUserModel:', error);
    throw error; 
  }
}

export const findUserByEmailModel = async(email) => {
    const sqlQuery = {
        text: `
          SELECT u.*, r.id_rol, r.descripcion AS rol_descripcion
          FROM usuario u
          LEFT JOIN rol r ON u.id_rol = r.id_rol
          WHERE u.email = $1
        `,
        values: [email]
    }
    const response = await pool.query(sqlQuery)
    return response.rows[0]
}

export const findUserByIdModel = async(id_usuario) => {
    const sqlQuery = {
        text: `
          SELECT u.*, r.id_rol, r.descripcion AS rol_descripcion
          FROM usuario u
          LEFT JOIN rol r ON u.id_rol = r.id_rol
          WHERE u.id_usuario = $1
        `,
        values: [id_usuario]
    }
    const response = await pool.query(sqlQuery)
    return response.rows[0]
}

export const updateUserModel = async (id, nombre, apellido, password)=>{
    const hashedPassword = bcrypt.hashSync(password)
    const sqlQuery = {
        text : `UPDATE usuario 
                SET nombre = $1,
                    apellido = $2,
                    password = $3
                WHERE 
                    id_user = $4
                RETURNING nombre, apellido, email`,
        values: [nombre, apellido, hashedPassword, id]
    }
    console.log(sqlQuery)
    const response = await pool.query(sqlQuery)
    return response.rows[0]
}