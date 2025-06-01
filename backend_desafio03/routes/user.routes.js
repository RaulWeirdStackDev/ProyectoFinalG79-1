import { Router }  from "express";
import { createUser, getUserById } from "../src/controllers/user.controller.js";
import { createUserMiddleware } from "../middleware/user.middleware.js";

const router = Router()
router.post('/auth/register', createUserMiddleware, createUser)
router.get('/user/:id', getUserById)



export default router