import validate from "com/validate.js"
import { User } from "../models/index.js"
import { NotFoundError, SystemError } from "com/errors.js"

const getUserProfile = (userId, requestingUserId) => {
    validate.id(userId, 'userId')
    validate.id(requestingUserId, 'requestingUserId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                throw new NotFoundError('user not found')

            }

            if (userId !== requestingUserId) {
                delete user.email
                delete user.password
            }
            user.id = user._id.toString()

            return user
        })
}

export default getUserProfile