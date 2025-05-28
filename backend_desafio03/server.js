import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import rolRouter from './routes/rol.routes.js'
// import authRoutes from './routes/auth.routes.js'
import { log } from './middleware/log.middleware.js'


const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(cors())
app.use(log)

app.use('/api',rolRouter)
// app.use('',authRoutes)

app.listen(PORT, console.log(`🍒 Server http://localhost:${PORT}`))