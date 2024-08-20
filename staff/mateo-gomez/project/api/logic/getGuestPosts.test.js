import 'dotenv/config'
import mongoose from 'mongoose'

import getGuestPosts from './getGuestPosts.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getGuestPosts('66b0fb45daed429022043387')
                .then(posts => console.log('guest posts retrieved', posts))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))    