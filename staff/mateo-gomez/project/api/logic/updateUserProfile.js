import { NotFoundError, SystemError } from "../../com/errors.js"
import validate from "../../com/validate.js"
import { User } from '../models/index.js'


const updateUserProfile = (userId, updates) => {
    validate.id(userId, 'userId')

    return User.findById(userId)
        .then(user => {
            if (!user) {
                throw new NotFoundError('User not found')
            }




            const updateFields = {}

            if (updates.username) {
                validate.username(updates.username, 'username')
                updateFields.username = updates.username
            }

            if (updates.name) {
                validate.name(updates.name, 'name')
                updateFields.name = updates.name
            }

            if (updates.surname) {
                validate.surname(updates.surname, 'surname')
                updateFields.surname = updates.surname
            }


            if (updates.profileImage) {
                validate.url(updates.profileImage, 'profileImage')
                updateFields.profileImage = updates.profileImage
            }

            if (updates.description) {
                validate.text(updates.description, 'description')
                updateFields.description = updates.description
            }



            return User.findByIdAndUpdate(userId, updateFields, { new: true }).select('-__v').lean()
                .then(updatedUser => {
                    if (!updatedUser) {
                        throw new NotFoundError('user not found after update')
                    }
                    return updatedUser
                })
        })
        .catch(error => {
            throw new SystemError(error.message)
        })

}

export default updateUserProfile