import 'dotenv/config'
import mongoose from 'mongoose'

import updateGalleryImages from './updateGalleryImages.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            updateGalleryImages('66cef359a4793936f374eb49', ['https://i.pinimg.com/736x/8d/a0/00/8da000895c8d35978e7c5a59405915a5.jpg', 'https://cdntattoofilter.com/tattoo/28357/l.jpg', 'https://i.pinimg.com/originals/9b/00/0c/9b000cf4b81c28d16695e158f0468923.jpg', 'https://cdn.shopify.com/s/files/1/0618/9642/5662/files/LeBron-Tat_large.jpg'])

                .then((user) => {
                    console.log('Gallery Images updated', `${user}`)
                })
                .catch((error) => console.error(error.message))
        } catch (error) {
            console.error(error.message)
        }
    })
    .catch(error => console.error(error.message))