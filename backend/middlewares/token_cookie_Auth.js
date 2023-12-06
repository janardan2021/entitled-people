import jwt from 'jsonwebtoken'

import asyncHandler from 'express-async-handler'

import User from '../models/user.js'

const protectTokenAndCookie = asyncHandler(async (req, res, next) => {
   let token;

   token = req.cookies.CookieWithJWT

   if (token) {
    try {
        // Here decoded will have the property userId which was used to create the token
        const decoded = jwt.verify(token, process.env.SECRET)
        // Get the user witheout the password from the database and attach it to the request object
        req.userTokenAndCookie = await User.findById(decoded.userId).select('-password')
        console.log('protectTokenAndCookie middleware has run')
        // call the next middleware
        next()
    } catch (error) {
        res.status(401).json({error: 'User not authorized'})
    }
   }else {
    res.status(401).json({error: 'User not authorized, no token'})
   }

})

export {protectTokenAndCookie}