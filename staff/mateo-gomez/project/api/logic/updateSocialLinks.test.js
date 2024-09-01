import 'dotenv/config'
import mongoose from 'mongoose'

import updateSocialLinks from './updateSocialLinks.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            updateSocialLinks('66cef359a4793936f374eb49', '{ "twitter": "https://x.com/luka7doncic?lang=es" }')
                .then(() => {
                    console.log('Social Links Updated')
                })
                .catch((error) => console.error(error.message))
        } catch (error) {
            console.error(error.message)
        }
    })
    .catch(error => console.error(error.message))