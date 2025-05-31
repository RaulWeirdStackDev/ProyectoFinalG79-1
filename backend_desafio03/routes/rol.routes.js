import { Router }  from "express";
import { getAllRoll } from "../src/controllers/rol.controller.js";

const router = Router()

router.get('/rol', getAllRoll)
export default router