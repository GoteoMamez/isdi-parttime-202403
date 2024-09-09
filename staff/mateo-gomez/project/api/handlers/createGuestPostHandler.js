import jwt from '../util/jsonwebtoken-promised.js'

import logic from '../logic/index.js'

const { JWT_SECRET } = process.env

const createGuestPostHandler = (req, res, next) => {
    try {
        const token = req.headers.authorization.slice(7)

        jwt.verify(token, JWT_SECRET)
            .then(payload => {
                const { sub: userId } = payload

                const { image, fromLocation, toLocation, date, description } = req.body

                try {
                    logic.createGuestPost(userId, image, fromLocation, toLocation, date, description)
                        .then(() => res.status(201).send())
                        .catch(error => next(error))
                } catch (error) {
                    next(error)
                }
            })
            .catch(error => {
                if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
                    res.status(500).json({ error: SystemError.name, message: error.message })


                } else
                    next(error)
            })

    } catch (error) {
        next(error)
    }

}

export default createGuestPostHandler