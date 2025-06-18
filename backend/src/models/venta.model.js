import pool from '../../db/config.js'

export const createVentaModel = async (id_usuario, descripcion, tipoEntrega, direccionEnvio) => {
    const sqlQuery = 'INSERT INTO venta (id_usuario, descripcion, tipo_Entrega,direccion_envio) VALUES ($1, $2, $3, $4) RETURNING *'
    const values = [id_usuario, descripcion, tipoEntrega, direccionEnvio]
    const response = await pool.query(sqlQuery, values)
    return response.rows
}

export const readVentaByUsuarioModel = async (id) => {
    const sqlQuery = `SELECT ven.id_venta, ven.id_usuario, ven.descripcion, ven.tipo_Entrega, ven.direccion_envio,
                        sum (det.precio_final) as total_venta
                    FROM venta ven
                    JOin venta_detalle det ON ven.id_venta = det.id_venta
                    WHERE ven.id_usuario = $1
                    GROUP BY ven.id_venta, ven.id_usuario, ven.descripcion, ven.tipo_Entrega, ven.direccion_envio`
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
