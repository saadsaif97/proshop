import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import { generateToken } from './../utils/generateToken.js';

/**
 * @description login a user
 * @route       POST /api/users/login
 * @access      Public
 */
export const getAuth = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && await user.matchPassword(password)) {
        return res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

/**
 * @description register a user
 * @route       POST /api/users
 * @access      Public
 */
export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    const existingUser = await User.findOne({ email })

    if (existingUser) {
        res.status(401)
        throw new Error(`User with email:${email} already exits`)
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})


/**
 * @description get user profile
 * @route       GET /api/users/profile
 * @access      PROTECTED
 */
export const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        return res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

/**
 * @description update profile
 * @route       PUT /api/users
 * @access      Protected
 */
export const updateUserProfile = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    const user = await User.findById(req.user._id)

    if (user) {
        user.name = name || user.name
        user.email = email || user.email
        user.password = password || user.password
    }

    const updatedUser = await user.save()

    if (user) {
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})
