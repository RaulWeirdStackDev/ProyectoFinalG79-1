import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]
        if (!token) {
            return res.status(401).json({ error: "No token provided" })
        }
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = payload
        next()
    } catch (error) {
        console.error('ERROR_JWT =>', error)
        return res.status(400).json({error: 'Error al procesar la solicitud'})
    }
};
