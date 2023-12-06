import User from '../models/user.js'

import jwt from 'jsonwebtoken'


const protectToken = async (req, res, next) => {
    // verify authentication
    const {authorization} = req.headers

    if (!authorization) {
        return res.status(401).json({error: 'Authorization token required'})
    }

    const token = authorization.split(' ')[1]
   
    try {
       const {_id} = jwt.verify(token, process.env.SECRET)
       
       // Get the user's Id  from the database and attach it to the request object
       req.userToken = await User.findOne({_id}).select(_id)
       console.log('protectToken middleware has run')
       next()
    } catch (error) {
        // console.log(error)
        res.status(401).json({error: 'Request is not authorized'})
    }
    
}

export {protectToken}