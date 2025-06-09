import { createVentaDetalleModel, createVentaModel, readVentaByUsuarioModel, readVentaByVentaModel } from "../models/venta.model.js"

export const createVenta = async (req, res) => {
    try {
        const { id_usuario, descripcion, detalle } = req.body
        const venta = await createVentaModel(id_usuario, descripcion)
        if (!venta) {
            res.status(500).json({ message: 'Error al procesar la solicitud' })
        }
        const id_venta = venta[0].id_venta
        const resultadosDetalle = []
        for (const producto of detalle) {
            const { id_producto, cantidad, precio_venta, descuento, precio_final } = producto
            const detalleInsertado = await createVentaDetalleModel(
                id_venta,
                id_producto,
                cantidad,
                precio_venta,
                descuento || 0,
                precio_final
            )
            resultadosDetalle.push(detalleInsertado[0])
        }
        res.status(201).json({
                    venta: venta[0],
                    detalle: resultadosDetalle
                })
    } catch (error) {
        res.status(500).json({ error: 'Error al procesar la solicitud' })
        console.error('ERROR_CONTROLLER_CREATE =>', error)
    }
}

export const readVentaByUsuario  = async (req, res) => {
    try {
        const { id } = req.params
        const data = await readVentaByUsuarioModel(id)
        res.status(200).json({ data })
    } catch (error) {
        res.status(500).json({ error: 'Error al procesar la solicitud' })
        console.error('ERROR_CONTROLLER_GET_BY_USUARIO =>', error)
    }
}

export const readVentaByVenta  = async (req, res) => {
    try {
        const { id } = req.params
        const data = await readVentaByVentaModel(id)
        res.status(200).json({ data })
    } catch (error) {
        res.status(500).json({ error: 'Error al procesar la solicitud' })
        console.error('ERROR_CONTROLLER_GET_BY_ID =>', error)
    }
}

