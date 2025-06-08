import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import userRouter from './routes/user.routes.js'
import authRouter from './routes/auth.routes.js'
import rolRouter from './routes/rol.routes.js'
import categoriaRouter from './routes/categoria.routes.js'
import carouselRouter from './routes/carousel.routes.js'
import regionRouter from './routes/region.routes.js'
import comunaRouter from './routes/comuna.routes.js'
import direccionRouter from './routes/direccion.routes.js'
import productoRouter from './routes/producto.routes.js'


import { log } from './middleware/log.middleware.js'

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(cors())
app.use(log)

app.use('/api',authRouter)
app.use('/api',userRouter)
app.use('/api',rolRouter)
app.use('/api',categoriaRouter)
app.use('/api',carouselRouter)
app.use('/api',regionRouter)
app.use('/api',comunaRouter)
app.use('/api',direccionRouter)
app.use('/api', productoRouter)
console.log('Tipo:', typeof process.env.DB_PASSWORD, 'Valor:', process.env.DB_PASSWORD)

app.listen(PORT, console.log(`🍒 Server http://localhost:${PORT}`))