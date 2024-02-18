import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    ImageURL: {
        type: String,
        trim: true,
        default: "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-symbol-image-default-avatar-profile-icon-vector-social-media-user-symbol-209498286.jpg"
    },
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    username: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        unique: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    bio: {
        type: String,
        trim: true,
        required: true,
        default: '404 bio not found',
        maxlength: 200
    },
    posts: {
        type: Array,
        default: []
    },
    followers: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    },
    bookmarks: {
        type: Array,
        default: []
    },
    role: {
        type: String,
        default: 'user'
    }
}, { timestamps: true })

const USER = mongoose.model('User', userSchema);

export default USER;