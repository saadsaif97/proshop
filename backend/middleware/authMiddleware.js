import User from './../models/userModel.js';
import asyncHandler from 'express-async-handler';
import jsonwebtoken from 'jsonwebtoken';

const protect = asyncHandler(async (req, res, next) => {
    const token = req.headers.authorization
    if (token && token.startsWith('Bearer ')) {
        try {
            const { id } = jsonwebtoken.verify(token.split(" ")[1], process.env.JWT_SECRET)
            const user = await User.findById(id).select('-password')
            req.user = user
            next()
        } catch (error) {
            res.status(401)
            throw new Error('Not Authorized, Token failed')
        }
    } else {
        res.status(401)
        throw new Error("Not Authorized, No token")
    }
})


export { protect }