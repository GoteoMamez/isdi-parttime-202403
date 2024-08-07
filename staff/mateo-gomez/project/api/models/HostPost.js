import { Schema, model, Types } from "mongoose";

const { ObjectId } = Types

const hostPost = new Schema({
    author: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    image: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    offer: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    description: {

    }
})

const HostPost = model('HostPost', hostPost)

export default HostPost