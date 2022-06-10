import { getProduct, getProducts } from "../contollers/product.js"

import express from "express"

const router = express.Router()

router.get('/', getProducts)
router.get("/:id", getProduct)


export default router
