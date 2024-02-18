import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    Userid: {
        type: String,
        trim: true,
        required: true
    },
    ImageURL: {
        type: String,
        trim: true,
        required: true
    },
    Caption: {
        type: String,
        trim: true,
        required: true,
        maxlength: 100,
    },
    Likes: {
        type: Array,
        default: []
    },
    Comments: {
        type: Array,
        default: []
    }
}, { timestamps: true })

const POST = mongoose.model('Post', postSchema);

export default POST;