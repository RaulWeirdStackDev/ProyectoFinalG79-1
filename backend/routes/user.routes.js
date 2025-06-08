import { Router }  from "express";
import { createUser, getUserById, updateUser } from "../src/controllers/user.controller.js";
import { createUserMiddleware } from "../middleware/user.middleware.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router()
router.post('/auth/register', createUserMiddleware, createUser)
router.get('/user/:id', getUserById)
router.patch('/user/:id', authMiddleware, updateUser)

export default router