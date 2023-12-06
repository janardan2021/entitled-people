import express from 'express'

const router = express.Router()

import mongoose from 'mongoose'
import Review from '../models/review.js'
import Frustation from '../models/frustation.js'

// Middlewares
// This middleware will use the token saved in the cookie to check autorization
import { protectTokenAndCookie } from '../middlewares/token_cookie_Auth.js'
// This middleware will use the token saved in the usersContext (and localstorage) to check the authorization
import {protectToken} from '../middlewares/token_Auth.js'
// For validation of the body data
import { validateReview } from '../middlewares/validations.js'

// GET all reviews
router.get('/:frustationId', async (req, res) => {
    const {frustationId} = req.params
    const reviews = await Review.find({frustation: frustationId}).sort({createdAt: -1})
    res.status(200).json(reviews)
})

// DELETE all reviews
router.delete('/:frustationId',protectToken, protectTokenAndCookie, async (req, res) => {
    const {frustationId} = req.params

   const review  = await Review.findOneAndDelete({frustation: frustationId })
    if(!review) {
        return res.status(400).json({error: 'No such review'})
    }
    res.status(200).json(review)
})


// GET a single review
router.get('/:frustationId/:reviewId', async (req, res) => {
    const {frustationId, reviewId} = req.params

    if (!mongoose.isValidObjectId(reviewId)) {
        return res.status(400).json({error: 'No such review, I checked it'})
    }
    const review = await findOne({_id: reviewId})
    if(!review) {
        return res.status(400).json({error: 'No such review exist'})
    }
    res.status(200).json(review)
})

// POST a new review
router.post('/:frustationId',protectToken, protectTokenAndCookie, validateReview, async (req, res) => {
    const {frustationId} = req.params
    const {user, name, isliked, comment} = req.body

    const frustation = await Frustation.findOne({_id: frustationId})
    const count = frustation.likes + frustation.dislikes
    
   if (count <= 5) {
      // we do this because with fetch we sent stringified json
    const likeCheck = Boolean(Number(isliked))
    if (likeCheck) {
        // console.log('if condition has value:', (likeCheck ))
        frustation.likes = frustation.likes + 1
        
    } else {
        // console.log('else condition has value:', (likeCheck ))
        frustation.dislikes = frustation.dislikes + 1
        
    }
    const updatedFrustation = await frustation.save()
    
    // const updatedFrustation = await Frustation.findOneAndUpdate({_id: id}, {likes: likes, dislikes: dislikes})
    // Find the review with the frustation id
    const review = await Review.findOne({frustation: frustationId})
   
    // console.log(review)
    if (!review) {
        try {
            const newReview = await Review.create({frustation: frustationId})
            // console.log(newReview)
            newReview.reviewer.push({user, name, isliked, comment})
            const savedReview = newReview.save()
            res.status(200).json(savedReview)
        } catch (error) {
            return res.status(400).json({error: 'Review creation not successful'})
        }
    }else {
        // console.log(review)
        review.reviewer.push({user, name, isliked, comment})
        const savedReview =review.save()
        res.status(200).json(savedReview)
    }

   } else {
    return res.status(400).json({error: 'Maximum limit reached, no more reviews can be done.'})
   }
    
})



// DELETE a review
router.delete('/:frustationId/:reviewId', protectTokenAndCookie, async (req, res) => {
    const {reviewId} = req.params

    if (!mongoose.isValidObjectId(reviewId)) {
        return res.status(400).json({error: 'No such Review, I checked it'})
    }

    const review  = await Review.findOneAndDelete({_id: reviewId})
    if(!review) {
        return res.status(400).json({error: 'No such review'})
    }
    res.status(200).json(review)
})



export default router