import {
  createProductoModel,
  readAllProductosModel,
  readProductosPorCategoriaModel,
  updateProductoModel,
} from "../models/producto.model.js"

export const createProducto = async (req, res) => {
  try {
    const datosProducto = req.body
    const result = await createProductoModel(datosProducto)
    res.status(201).json({ producto: result })
  } catch (error) {
    console.error('ERROR_CONTROLLER_CREATE_PRODUCTO =>', error)
    res.status(500).json({ error: "Error al crear producto" })
  }
}

export const readAllProductos = async (req, res) => {
  try {
    const data = await readAllProductosModel()
    res.status(200).json(data)  // acá no lo envuelvo en objeto para facilitar front
  } catch (error) {
    console.error('ERROR_CONTROLLER_GET_PRODUCTOS =>', error)
    res.status(500).json({ error: "Error al obtener productos" })
  }
}

export const readProductosPorCategoria = async (req, res) => {
  try {
    const { categoria } = req.params
    const data = await readProductosPorCategoriaModel(categoria)
    res.status(200).json(data)
  } catch (error) {
    console.error('ERROR_CONTROLLER_GET_PRODUCTOS_POR_CATEGORIA =>', error)
    res.status(500).json({ error: "Error al obtener productos por categoría" })
  }
}

export const updateProducto = async (req, res) => {
  try {
    const { id } = req.params
    const datos = req.body
    const result = await updateProductoModel(id, datos)
    res.status(200).json({ producto: result })
  } catch (error) {
    console.error('ERROR_CONTROLLER_UPDATE_PRODUCTO =>', error)
    res.status(500).json({ error: "Error al actualizar producto" })
  }
}
