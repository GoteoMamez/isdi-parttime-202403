import jwt from '../util/jsonwebtoken-promised.js'

import logic from '../logic/index.js'

const { JWT_SECRET } = process.env

const createGuestPostHandler = (req, res, next) => {
    try {
        const token = req.headers.authorization.slice(7)

        jwt.verify(token, JWT_SECRET)
            .then(payload => {
                const { sub: userId } = payload

                const { image, description, date, age, fromLocation, toLocation } = req.body

                try {
                    logic.createGuestPost(userId, image, description, date, age, fromLocation, toLocation)
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