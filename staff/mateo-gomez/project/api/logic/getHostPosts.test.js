import 'dotenv/config'
import mongoose from 'mongoose'

import getHostPosts from './getHostPosts.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getHostPosts('66abba217a8e0896f686f9dc')
                .then(posts => console.log('guest posts retrieved', posts))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))    