import jwt from '../util/jsonwebtoken-promised.js'
import logic from '../logic/index.js'
import { CredentialsError } from 'com/errors.js'

const { JWT_SECRET } = process.env

const getUserProfileHandler = (req, res, next) => {
    try {
        const token = req.headers.authorization.slice(7)

        jwt.verify(token, JWT_SECRET)
            .then(payload => {
                const { sub: userId } = payload

                const requestingUserId = req.params.userId

                try {
                    logic.getUserProfile(userId, requestingUserId)
                        .then(userProfile => res.json(userProfile))
                        .catch((error) => next(error))

                } catch (error) {
                    next(error)
                }
            })
            .catch(error => next(new CredentialsError(error.message)))

    } catch (error) {
        next(error)
    }

}

export default getUserProfileHandler