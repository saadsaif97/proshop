import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

/**
 * @description fetch all products
 * @route       GET /api/products
 * @access      Public
 */
export const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find()
    return res.status(200).send(products)
})

/**
 * @description fetch one product
 * @route       GET /api/products/:id
 * @access      Public
 */
export const getProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        return res.status(200).send(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})