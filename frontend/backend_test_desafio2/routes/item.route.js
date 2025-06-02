import { Router } from "express";
import { itemController } from "../controllers/item.controller.js";

const router = Router();

router.get("/", itemController.readItems);
router.get("/:id", itemController.readItem);

export default router;
