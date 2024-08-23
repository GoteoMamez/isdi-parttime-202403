import "dotenv/config"
import mongoose from "mongoose"

import registerUser from "./registerUser.js"

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            registerUser('Luk', 'Dondc', 'eslovenoNba', 'lukadoncic7@nba.com', '123123123', '123123123', 'https://estaticos-cdn.prensaiberica.es/clip/83fd6f51-7e1d-46fc-a5f6-f4f834044e0f_16-9-discover-aspect-ratio_default_0.jpg', 'Soy Luka y me encantan los tatuajes, quiero conocer a nuevos profesionales y estoy encantado de acoger en mi humilde casa a quien lo necesite', ['https://estaticos-cdn.prensaiberica.es/clip/31537a05-e897-44f6-8664-f882233ad516_source-aspect-ratio_default_0.jpg', 'https://cdn.legalsport.net/wp-content/uploads/2023/01/GettyImages-1447300079.jpg', 'https://i.pinimg.com/originals/9b/00/0c/9b000cf4b81c28d16695e158f0468923.jpg', 'https://i.imgur.com/JGsxaQ2.jpg'], {
                twitter: 'https://x.com/luka7doncic',
                instagram: 'https://www.instagram.com/lukadoncic/',
                facebook: '',
                youtube: ''
            })
                .then(() => console.log('user registered'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))