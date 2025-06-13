import { Router } from "express"
import { authMiddleware } from "../middleware/auth.middleware.js"
import {
  createProducto,
  readAllProductos,
  readProductosPorCategoria,
  updateProducto,
} from "../src/controllers/producto.controller.js"

const router = Router()

router.post('/producto',authMiddleware, createProducto)
router.get('/productos', readAllProductos)
router.get('/productos/:categoria', readProductosPorCategoria)
router.patch('/producto/:id', authMiddleware, updateProducto)

export default router
