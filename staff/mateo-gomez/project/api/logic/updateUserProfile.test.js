import 'dotenv/config'
import mongoose from 'mongoose'

import updateUserProfile from './updateUserProfile.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            updateUserProfile('66cef359a4793936f374eb49',
                {
                    profileImage: 'https://estaticos-cdn.prensaiberica.es/clip/e1df3d69-cea4-4c9a-aedf-1cda9fce2f49_alta-libre-aspect-ratio_default_0.jpg',
                    description: 'Soy Luka Doncic y me flipan los tatuajes',
                    socialLinks: {
                        twitter: 'https://x.com/luka7doncic?lang=es',
                        instagram: 'https://www.instagram.com/lukadoncic/',
                        youtube: 'https://www.youtube.com/@lukadoncic6206',
                    },
                    galleryImages: ['https://images.eurohoops.net/2017/09/Doncic-Eurobasket.jpg', 'https://64.media.tumblr.com/40c9ab8d59ee80ca0f75a60d40fd5360/tumblr_oz5m1vC2uL1wgtzo4o1_500.jpg']
                }
            )
                .then(() => {
                    console.log('User Edited')
                })
                .catch((error) => console.error(error.message))
        } catch (error) {
            console.error(error.message)
        }
    })
    .catch(error => console.error(error.message))