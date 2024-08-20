import 'dotenv/config'
import mongoose from 'mongoose'

import deleteHostPost from './deleteHostPost.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            deleteHostPost('66abba217a8e0896f686f9dc', '66ba2f04c1c54a76a60d8723')
                .then(() => console.log('post deleted'))
                .catch(error => console.error(error))

        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))