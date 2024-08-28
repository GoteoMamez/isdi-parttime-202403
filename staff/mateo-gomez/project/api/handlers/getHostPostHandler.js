import 'dotenv/config'
import jwt from '../util/jsonwebtoken-promised.js'

import logic from '../logic/index.js'
import { SystemError } from 'com/errors.js'


const { JWT_SECRET } = process.env

const getHostPostsHandler = (req, res, next) => {
    try {

        const token = req.headers.authorization.slice(7)

        jwt.verify(token, JWT_SECRET)
            .then(payload => {
                const { sub: userId } = payload

                try {
                    logic.getHostPosts(userId)
                        .then(posts => res.json(posts))
                        .catch(error => next(error))


                } catch (error) {
                    next(error)
                }
            })
            .catch(error => {

                next(error)
            })
    } catch (error) {
        next(error)
    }
}

export default getHostPostsHandler