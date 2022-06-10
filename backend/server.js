import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

import colors from "colors"
import connectDB from './db.js';
import dotenv from "dotenv"
import express from "express"
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express()

// Dot Env + Database
dotenv.config()
connectDB()

// Middleware
app.use(express.json())


// Routes
app.use("/api/products", productRoutes)
app.use("/api/users", userRoutes)

app.use(errorHandler)
app.use(notFound)

// Server
const PORT = process.env.PORT || 8000
app.listen(PORT, () => console.log(`Server is currently running on port ${PORT}...!`.yellow.bold))
