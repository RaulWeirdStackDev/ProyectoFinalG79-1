import { createComunaModel, deleteComunanModel, readAllComunaModel, updateComunanModel } from "../models/comuna.model.js"

export const createComuna = async (req, res) => {
    try {
        const { descripcion } = req.body
        const result = await createComunaModel(descripcion)
        res.status(200).json({ data: result })
    } catch (error) {
        res.status(500).json({ error: 'Error al procesar la solicitud' })
        console.error('ERROR_CONTROLLER_REGISTER =>', error)
    }
}

export const readAllComuna = async (req, res) => {
    try {
        const data = await readAllComunaModel()
        res.status(200).json({ data })
    } catch (error) {
        res.status(500).json({ error: 'Error al procesar la solicitud' })
        console.error('ERROR_CONTROLLER_GET =>', error)
    }
}

export const updateComuna = async (req, res) => {
    try {
        const {id} = req.params
        const {descripcion } = req.body
        const result = await updateComunanModel(id, descripcion)
        res.status(200).json({ data: result })
    } catch (error) {
        res.status(500).json({ error: 'Error al procesar la solicitud' })
        console.error('ERROR_CONTROLLER_UPDATE =>', error)
    }
}

export const deleteComuna = async (req, res) => {
    try {
        const {id} = req.params
        const result = await deleteComunanModel(id)
        res.status(200).json({ data: result })
    } catch (error) {
        res.status(500).json({ error: 'Error al procesar la solicitud' })
        console.error('ERROR_CONTROLLER_DELETE =>', error)
    }
}