import { getAuth, getUser, registerUser } from './../contollers/user.js';

import express from "express"
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router()

router.post("/", registerUser)
router.post("/login", getAuth)
router.get("/profile", protect, getUser)


export default router
