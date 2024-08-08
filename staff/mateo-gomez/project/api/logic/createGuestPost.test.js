import 'dotenv/config'
import mongoose from 'mongoose'

import createGuestPost from './createGuestPost.js'


const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            createGuestPost('66b0fb45daed429022043387', 'https://media.giphy.com/media/fxC3SOpMVnDWrvo3H5/giphy.gif?cid=790b7611hp6lnlnjfi37qa651t9kjw96fb7xmztbraufqr0l&ep=v1_gifs_search&rid=giphy.gif&ct=g', 'Mavs is close to get in the NBA Finals', '27 de junio a 1 de julio', '27', 'Oviedo', 'Madrid')
                .then(() => console.log('guest post created'))
                .catch(error => console.error(error))

        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))