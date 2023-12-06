import mongoose from "mongoose";

const frustationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    title: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        required: false,
        default:0
    },
    dislikes: {
        type: Number,
        required:false,
        default:0
    }
}, {timestamps:true});

const Frustation = mongoose.model("Frustation", frustationSchema)

export default Frustation;