import express from 'express'

const router = express.Router()

import User from '../models/user.js'

import jwt from 'jsonwebtoken'

import createToken_setCookie from '../utils/createToken_setCookie.js'

// Middleware
import { validateUser } from '../middlewares/validations.js'

const createToken = (_id) => {
   return jwt.sign({_id: _id}, process.env.SECRET, {expiresIn: '3d'})
}

// login route
router.post('/login', validateUser, async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await User.login(email, password)

         //PART-1 create token  that will be stored in the local storage of the client 
         const token = createToken(user._id)
         // PART-2 generate token and set cookie on res
         createToken_setCookie(res, user._id)
 
         // It will send token to client for local storage PART-1
         // Also it will send the cookie to the clien PART-2
         res.status(200).json({email, token, name: user.name, _id: user._id})
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
} )

// signup route
router.post('/signup', validateUser, async (req, res) => {
    const {name, email, password} = req.body
    const count =await User.countDocuments()
    if (count <= 10) {
        try {
            const user = await User.signup(email, password, name)
            //PART-1 create token  that will be stored in the local storage of the client 
            const token = createToken(user._id)
            // PART-2 generate token and set cookie on res
            createToken_setCookie(res, user._id)
    
            // It will send token to client for local storage PART-1
            // Also it will send the cookie to the clien PART-2
            res.status(200).json({ _id: user._id, name: user.name, email,  token,})
        } catch (error) {
            res.status(400).json({error: error.message})
        }
    } else {
        res.status(400).json({error: "Maximu limit reached. No more users can be created"})
    }

    
} )

// Logout route
// Just to reset the cookie to nothing
router.post('/logout',async (req, res) => {

    try {
        res.cookie('CookieWithJWT', '', {
            httpOnly: true,
            expires: new Date(0)
        })
        res.status(200).json({message: 'User logged out'})
    } catch (error) {
        res.status(400).json({error: error.message})
    }

    
} )

export default router
