import { Schema, model, Types } from "mongoose";

const { ObjectId } = Types


const post = new Schema({
    author: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    comment: [{
        type: {
            author: {
                type: ObjectId,
                required: true,
                ref: 'User'
            },
            text: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                required: true,
                default: Date.now
            }
        }
    }],
    liked: [{
        type: ObjectId,
        ref: 'User'
    }]
})

const Post = model('Post', post)

export default Post