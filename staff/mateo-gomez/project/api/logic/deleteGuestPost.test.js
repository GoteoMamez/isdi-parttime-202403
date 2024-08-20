import 'dotenv/config'
import mongoose from 'mongoose'

import deleteGuestPost from './deleteGuestPost.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            deleteGuestPost('66b0fb45daed429022043387', '66b51fe79f8d75976b265aca')
                .then(() => console.log('post deleted'))
                .catch(error => console.error(error))

        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))