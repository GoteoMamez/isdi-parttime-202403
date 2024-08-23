import validate from "com/validate.js"
import { User } from "../models/index.js"
import { NotFoundError, SystemError } from "com/errors.js"

const getUserProfile = (userId) => {
    validate.id(userId, 'userId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                throw new NotFoundError('user not found')


                return {
                    userId,
                    profileImage: '',
                    description: '',
                    galleryImages: [],
                    socialLinks: {
                        twitter: '',
                        instagram: '',
                        facebook: '',
                        youtube: ''
                    }
                }
            }
            user.id = user._id.toString()

            return user
        })
}

export default getUserProfile