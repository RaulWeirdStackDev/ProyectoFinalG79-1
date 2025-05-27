import express from 'express'
import cors from 'cors'
import 'dotenv/config'

// import userRouter from './routes/user.routes.js'
// import authRoutes from './routes/auth.routes.js'
// import { userLog } from './middleware/user.middleware.js'


const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(cors())
// app.use(userLog)

// app.use('',userRouter)
// app.use('',authRoutes)

app.listen(PORT, console.log(`🍒 Server http://localhost:${PORT}`))