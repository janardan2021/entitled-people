import express from 'express'

import mongoose from 'mongoose'

const router = express.Router()

import Frustation from '../models/frustation.js'

// Middlewares
import { protectTokenAndCookie } from '../middlewares/token_cookie_Auth.js'
import {protectToken} from '../middlewares/token_Auth.js'
import { validateFrustation } from '../middlewares/validations.js'

// GET all frustations
router.get('/', async (req, res) => {
    // process.env.PAGINATION_LIMIT
    const pageSize= process.env.PAGINATION_LIMIT
    const page = Number(req.query.pageNumber) || 1
    const myFilter = Number(req.query.filter) || 1
    const count =await Frustation.countDocuments()
    const frustations = await Frustation.find({})
                                 .populate('user', 'name')
                                 .sort((myFilter === 2) ? {likes: -1} : (myFilter === 3) ? {dislikes: -1} : {createdAt: -1})
                                 .limit(pageSize)
                                 .skip(pageSize * (page - 1))
    // console.log(frustations)                             
    res.status(200).json({frustations, page, pages: Math.ceil(count/pageSize)})
})  
// .sort({createdAt: -1})
// GET a single frustaion
router.get('/:id', async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such workout, I checked it'})
    }

    const frustation = await Frustation.findOne({_id: id})
    res.status(200).json(frustation)
})

// POST a new frustation
router.post('/',  protectToken, protectTokenAndCookie, validateFrustation, async (req, res) => {
    const {user, title, comment} = req.body
    const count =await Frustation.countDocuments()
    if (count <= 10) {
        try {
            const frustation = await Frustation.create({user, title, comment})
            const poplatedFrustation = await Frustation.findOne({_id : frustation._id}).populate('user', 'name')
            res.status(200).json(poplatedFrustation)
        } catch (error) {
           res.status(400).json({error: error.message}) 
        }
    } else {
        res.status(400).json({error: 'Maximum limit reached. No more Frustations can be posted!'}) 
    }
})

// DELETE a frustation
router.delete('/:id', protectToken, protectTokenAndCookie, async (req, res) => {
    const {id} = req.params


    const frustation  = await Frustation.findOneAndDelete({_id: id})
    if(!frustation) {
        return res.status(400).json({error: 'No such frustation'})
    }
    res.status(200).json(frustation)
})

// UPDATE a frustation
router.patch('/:id',protectToken, protectTokenAndCookie, async  (req, res) => {
    const {id} = req.params
    const {title, comment} = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such workout, I checked it'})
    }

    const frustation = await Frustation.findOneAndUpdate({_id: id}, {title: title, comment: comment}, {new:true})
    const poplatedFrustation = await Frustation.findOne({_id : frustation._id}).populate('user', 'name')
    if(!frustation) {
        return res.status(400).json({error: 'No such frustation'})
    }
    res.status(200).json(poplatedFrustation)
    
})

export default router