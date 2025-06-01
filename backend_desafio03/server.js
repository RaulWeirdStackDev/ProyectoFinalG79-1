import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import userRouter from './routes/user.routes.js'
import authRouter from './routes/auth.router.js'
import rolRouter from './routes/rol.routes.js'
import categoriaRouter from './routes/categoria.routes.js'
import carouselRouter from './routes/carousel.route.js'


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

app.listen(PORT, console.log(`🍒 Server http://localhost:${PORT}`))