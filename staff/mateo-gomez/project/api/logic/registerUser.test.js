import "dotenv/config"
import mongoose from "mongoose"

import registerUser from "./registerUser.js"

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            registerUser('King', 'James', 'kingJames', 'kingjames23@nba2024.com', '123123123', '123123123', 'https://i.pinimg.com/736x/b3/75/eb/b375eb0669bf24903b625cd64777c88a.jpg', 'Soy Lebron y me encantan los tatuajes, quiero conocer a nuevos profesionales y estoy encantado de acoger en mi humilde casa a quien lo necesite', ['https://i.pinimg.com/736x/8d/a0/00/8da000895c8d35978e7c5a59405915a5.jpg', 'https://cdntattoofilter.com/tattoo/28357/l.jpg', 'https://i.pinimg.com/originals/9b/00/0c/9b000cf4b81c28d16695e158f0468923.jpg', 'https://cdn.shopify.com/s/files/1/0618/9642/5662/files/LeBron-Tat_large.jpg'], {
                twitter: 'https://x.com/KingJames?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor',
                instagram: 'https://www.instagram.com/kingjames/?hl=es',
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