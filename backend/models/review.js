import mongoose, { Mongoose } from "mongoose";

const reviewerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
        },
    name: {
        type: String,
        required: true
    },
    isliked: {
        type: Boolean,
        required: true,
        default: true
    },
    comment: {
        type: String,
        required: false
    }  
}, {timestamps:true});

const reviewSchema = new mongoose.Schema({
    frustation: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Frustation"
            },
    reviewer: [reviewerSchema]
}, {timestamps:true});



const Review = mongoose.model("Review", reviewSchema)

export default Review;