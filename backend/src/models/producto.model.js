import pool from '../../db/config.js'

export const createProductoModel = async (productoData) => {
  const {
    id_categoria,
    nombre,
    descripcion,
    idioma,
    precio_venta,
    descuento = 0,
    img,
    estado = 1,
    stock = 0,
    // Campos opcionales para single_mtg
    rareza,
    edicion,
    tipo,
    color,
    foil,
  } = productoData

  const client = await pool.connect()

  try {
    await client.query("BEGIN")

    const sqlProducto = `
      INSERT INTO producto (
        id_categoria, nombre, descripcion, idioma, precio_venta, descuento, img, estado
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id_producto
    `
    const valuesProducto = [
      id_categoria,
      nombre,
      descripcion,
      idioma,
      precio_venta,
      descuento,
      img,
      estado,
      stock,
    ]

    const resultProducto = await client.query(sqlProducto, valuesProducto)
    const id_producto = resultProducto.rows[0].id_producto

    // Verificar si la categoría es 'single_mtg'
    const sqlCategoria = `SELECT descripcion FROM categoria WHERE id_categoria = $1`
    const resultCategoria = await client.query(sqlCategoria, [id_categoria])
    const descripcionCategoria = resultCategoria.rows[0].descripcion

    if (descripcionCategoria === 'single_mtg') {
      const sqlMTG = `
        INSERT INTO producto_mtg (
          id_producto, rareza, edicion, tipo, color, foil
        ) VALUES ($1, $2, $3, $4, $5, $6)
      `
      const valuesMTG = [id_producto, rareza, edicion, tipo, color, foil]
      await client.query(sqlMTG, valuesMTG)
    }

    await client.query("COMMIT")
    return { id_producto }
  } catch (error) {
    await client.query("ROLLBACK")
    throw error
  } finally {
    client.release()
  }
}

export const readAllProductosModel = async () => {
  const sqlQuery = `
    SELECT  p.*,
            c.descripcion AS categoria,
            pm.rareza,
            pm.edicion,
            pm.tipo   AS tipo_carta,
            pm.color,
            pm.foil
    FROM producto p
    JOIN categoria c      ON p.id_categoria = c.id_categoria
    LEFT JOIN producto_mtg pm ON p.id_producto = pm.id_producto;
  `;
  const { rows } = await pool.query(sqlQuery);
  return rows;
};

export const readProductByIdModel = async (id) => {
  const sqlQuery = `
    SELECT  p.*,
            c.descripcion AS categoria,
            pm.rareza,
            pm.edicion,
            pm.tipo   AS tipo_carta,
            pm.color,
            pm.foil
    FROM producto p
    JOIN categoria c ON p.id_categoria = c.id_categoria
    LEFT JOIN producto_mtg pm ON p.id_producto = pm.id_producto
    WHERE p.id_producto = $1;`;
  const values = [id]
  const { rows } = await pool.query(sqlQuery, values);
  return rows;
};


export const readProductosPorCategoriaModel = async (categoriaDescripcion) => {
  const sqlQuery = `
    SELECT  p.*,
            c.descripcion AS categoria,
            pm.rareza,
            pm.edicion,
            pm.tipo   AS tipo_carta,
            pm.color,
            pm.foil
    FROM producto p
    JOIN categoria c      ON p.id_categoria = c.id_categoria
    LEFT JOIN producto_mtg pm ON p.id_producto = pm.id_producto
    WHERE c.descripcion = $1
      AND p.estado = '1';
  `;
  const { rows } = await pool.query(sqlQuery, [categoriaDescripcion]);
  return rows;
};

export const updateProductoModel = async (id, datos) => {
  const {
    id_categoria,
    nombre,
    descripcion,
    idioma,
    precio_venta,
    descuento,
    img,
    estado,
    stock,
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
        stock= $10
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
    stock,
  ]

  const response = await pool.query(sqlQuery, values)
  return response.rows
}
