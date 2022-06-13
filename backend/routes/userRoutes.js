import { getAuth, getUserProfile, registerUser, updateUserProfile } from './../contollers/user.js';

import express from "express"
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router()

router.post("/", registerUser)
router.post("/login", getAuth)
router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)


export default router
