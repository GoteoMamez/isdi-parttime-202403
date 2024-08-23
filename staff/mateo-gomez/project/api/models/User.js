import { Schema, model } from "mongoose"

const user = new Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        required: false
    },
    description: {
        type: String,
        maxlength: 700,
        required: false

    },
    galleryImages: [{
        type: String,
        required: false
    }],
    socialLinks: {
        twitter: {
            type: String,
            required: false

        },
        instagram: {
            type: String,
            required: false
        },
        facebook: {
            type: String,
            required: false
        },
        youtube: {
            type: String,
            required: false
        },
    }

})

const User = model('User', user)

export default User