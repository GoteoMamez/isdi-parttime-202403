import validate from "com/validate.js"
import { User } from "../models/index.js"
import { NotFoundError, SystemError } from "com/errors.js"

const getUserProfile = (userId, requestingUserId) => {
    validate.id(userId, 'userId')
    validate.id(requestingUserId, 'requestingUserId')

    requestingUserId = requestingUserId ? requestingUserId : userId

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                throw new NotFoundError('user not found')

            }
            return User.findById(requestingUserId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(requestingUser => {
                    if (!requestingUser) {
                        throw new NotFoundError('requesting user not found')
                    }

                    delete user.email
                    delete user.password


                    user.id = user._id.toString()

                    return user
                })



        })
        .catch(error => {
            throw new SystemError(error.message)
        })
}

export default getUserProfile