import { createRolModel, getRolModel } from "../models/rol.model.js"
// import jwt from 'jsonwebtoken'


export const createRol = async (req, res)=>{
    try {
        const {descripcion} = req.body
        const result = await createRolModel(descripcion)
        res.status(200).json({user: result})
    } catch (error) {
        res.status(500).json({error: 'Error al procesar la solicitud'})
        console.error('ERROR_CONTROLLER_REGISTER =>', error)
    }
}

export const getAllRol = async(req,res)=>{
    try {
        const token = req.header('Authorization')
        if(!token){
            return res.status(400).json({message: 'El token debe estar presente'})
        }
        const data = await getRolModel()
        res.status(200).json({data})
    } catch (error) {
        res.status(500).json({error: 'Error al procesar la solicitud'})
        console.error('ERROR_CONTROLLER_GET =>',error)
    }
}