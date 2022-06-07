import express from "express"
import products from './data/products.js';
import dotenv from "dotenv"
const app = express()

dotenv.config()

app.get("/", async (req, res) => {
    res.status(200).json(process.env.NODE_ENV)
})

app.get("/api/products", async (req, res) => {
    res.status(200).json(products)
})

app.get("/api/products/:id", async (req, res) => {
    let product = products.find(product => product._id === req.params.id)
    res.status(200).json(product)
})

// Server
const PORT = process.env.PORT || 8000
app.listen(PORT, () => console.log(`Server is currently running on port ${PORT}...!`))
