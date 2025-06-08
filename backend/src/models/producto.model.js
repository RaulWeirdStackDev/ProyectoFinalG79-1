import pool from '../../db/config.js'

export const createProductoModel = async ({
  id_categoria,
  nombre,
  descripcion,
  idioma,
  precio_venta,
  descuento = 0,
  img,
  estado = 1,
}) => {
  const sqlQuery = `
    INSERT INTO producto (
      id_categoria, nombre, descripcion, idioma, precio_venta, descuento, img, estado
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
  `
  const values = [
    id_categoria,
    nombre,
    descripcion,
    idioma,
    precio_venta,
    descuento,
    img,
    estado,
  ]
  const response = await pool.query(sqlQuery, values)
  return response.rows
}

export const readAllProductosModel = async () => {
  const sqlQuery = `
    SELECT p.*, c.descripcion AS categoria
    FROM producto p
    JOIN categoria c ON p.id_categoria = c.id_categoria
  `
  const response = await pool.query(sqlQuery)
  return response.rows
}

export const readProductosPorCategoriaModel = async (categoriaDescripcion) => {
  const sqlQuery = `
    SELECT p.*, c.descripcion AS categoria
    FROM producto p
    JOIN categoria c ON p.id_categoria = c.id_categoria
    WHERE c.descripcion = $1 AND p.estado = '1'
  `
  const values = [categoriaDescripcion]
  const response = await pool.query(sqlQuery, values)
  return response.rows
}

export const updateProductoModel = async (id, datos) => {
  // Para simplificar, actualizamos solo campos básicos, puedes adaptar luego
  const {
    id_categoria,
    nombre,
    descripcion,
    idioma,
    precio_venta,
    descuento,
    img,
    estado,
  } = datos

  const sqlQuery = `
    UPDATE producto
    SET id_categoria = $2,
        nombre = $3,
        descripcion = $4,
        idioma = $5,
        precio_venta = $6,
        descuento = $7,
        img = $8,
        estado = $9
    WHERE id_producto = $1
    RETURNING *
  `
  const values = [
    id,
    id_categoria,
    nombre,
    descripcion,
    idioma,
    precio_venta,
    descuento,
    img,
    estado,
  ]

  const response = await pool.query(sqlQuery, values)
  return response.rows
}
