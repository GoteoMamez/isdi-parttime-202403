import 'dotenv/config'
import logic from '../logic/index.js'
import jwt from '../util/jsonwebtoken-promised.js'
import { CredentialsError } from 'com/errors.js'



const { JWT_SECRET } = process.env

const updateGalleryImageHandler = (req, res, next) => {
    try {

        const token = req.headers.authorization.slice(7)


        jwt.verify(token, JWT_SECRET)
            .then(payload => {
                const { sub: userId } = payload
                const { newGalleryImages } = req.body
                try {
                    logic.updateGalleryImages(userId, newGalleryImages)
                        .then(() => {
                            res.status(200).send()
                        })
                        .catch(error => {
                            next(error)
                        })

                } catch (error) {
                    next(error)
                }
            })
            .catch(error => next(new CredentialsError(error.message)))

    } catch (error) {
        next(error)
    }
}

export default updateGalleryImageHandler