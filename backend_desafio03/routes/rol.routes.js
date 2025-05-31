import { Router }  from "express";
import { readAllRol } from "../src/controllers/rol.controller.js";

const router = Router()

router.get('/rol', readAllRol)
// router.get('/rol', readAllRol)
export default router