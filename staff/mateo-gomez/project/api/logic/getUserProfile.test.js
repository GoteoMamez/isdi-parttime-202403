import 'dotenv/config'
import mongoose from 'mongoose'

import getUserProfile from './getUserProfile'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getUserProfile('66c85f8aa6a29bb74cce4632', '66c6fdbedf37fb87446caae8')
                .then(name => console.log('user profile retrived', name))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))