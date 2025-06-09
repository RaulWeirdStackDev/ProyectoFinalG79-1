import pool from '../../db/config.js'

export const createVentaModel = async (id_usuario, descripcion) => {
    const sqlQuery = 'INSERT INTO venta (id_usuario, descripcion) VALUES ($1, $2) RETURNING *'
    const values = [id_usuario, descripcion]
    const response = await pool.query(sqlQuery, values)
    return response.rows
}

export const readVentaByUsuarioModel = async (id) => {
    const sqlQuery = 'SELECT * FROM venta where id_usuario = $1'
    const values = [id]
    const response = await pool.query(sqlQuery, values)
    return response.rows
}

export const createVentaDetalleModel = async (id_venta, id_producto, cantidad, precio_venta, descuento, precio_final) => {
    const sqlQuery = `INSERT INTO venta_detalle 
                    (id_venta, id_producto, cantidad, precio_venta, descuento, precio_final) 
                    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`
    const values = [id_venta, id_producto, cantidad, precio_venta, descuento, precio_final]
    const response = await pool.query(sqlQuery, values)
    return response.rows
}

export const readVentaByVentaModel = async (id) => {
    const sqlQuery = 'SELECT * FROM venta_detalle where id_venta = $1'
    const values = [id]
    const response = await pool.query(sqlQuery, values)
    return response.rows
}
