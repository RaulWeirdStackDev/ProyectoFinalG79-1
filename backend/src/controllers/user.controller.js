import { createUserModel, findUserByIdModel, updateUserModel } from "../models/user.model.js"

export const createUser = async (req, res)=>{
    try {
        const {nombre, apellido, email, password} = req.body
        const result = await createUserModel(nombre, apellido, email, password)
        res.status(200).json({user: result})
    } catch (error) {
        res.status(500).json({error: 'Error al procesar la solicitud'})
        console.error('ERROR_CONTROLLER_CREATE =>', error)
    }
}

export const getUserById = async(req,res)=>{
    try {
        const {id} = req.params
        if(!id){
            return res.status(400).json({error : 'ID is Required'})
        }
        const data = await findUserByIdModel(id)
        res
            .status(!data? 400 : 200)
            .json(!data? {error: 'Data not found'}:{data})
    } catch (error) {
        res.status(500).json({error: 'Error al procesar la solicitud'})
        console.log('ERROR_CONTROLLER_READ =>', error.message)
    }
}

export const updateUser = async (req, res)=>{
    try {
        const {id} = req.params
        const {nombre, apellido, password} = req.body
        if(!password){
            const data = await findUserByIdModel(id)
            password = data.password
        }
        const result = await updateUserModel(id, nombre, apellido, password)
        res.status(200).json({user: result})
    } catch (error) {
        res.status(500).json({error: 'Error al procesar la solicitud'})
        console.error('ERROR_CONTROLLER_UPDATE =>', error)
    }
}