import { Schema, model, Types } from "mongoose";

const { ObjectId } = Types

const guestPost = new Schema({
    author: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    image: {
        type: String,
        required: true
    },
    fromLocation: {
        type: String,
        required: true
    },
    toLocation: {
        type: String,
        required: true
    },
    date: {
        //TODO la fecha no es la fecha de publicación 
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

const GuestPost = model('GuestPost', guestPost)

export default GuestPost