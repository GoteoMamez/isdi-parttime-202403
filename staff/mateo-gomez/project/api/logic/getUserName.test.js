import 'dotenv/config'
import mongoose from 'mongoose'

import getUserName from './getUserName.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getUserName('66abba217a8e0896f686f9dc', '66b0fb45daed429022043387')
                .then(name => console.log('user name retrived', name))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })

    .catch(error => console.error(error))