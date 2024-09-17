import 'dotenv/config'
import mongoose from 'mongoose'

import getUserProfile from './getUserProfile.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getUserProfile('66d04fcb3118d2b76c235a19', '66cef359a4793936f374eb49')
                .then(name => console.log('user profile retrived', name))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))