import { User, GuestPost } from '../models/index.js'
import { NotFoundError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'

const createGuestPost = (userId, image, fromLocation, toLocation, date, description) => {
    validate.id(userId)
    validate.url(image, 'image')
    validate.text(description, 'description', 360)
    validate.text(date, 'date')

    validate.text(fromLocation, 'fromLocation')
    validate.text(toLocation, 'toLocation')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                throw new NotFoundError('User not found')

            }

            const guestPost = {
                author: userId,
                image,
                fromLocation,
                toLocation,
                date,
                description
            }

            return GuestPost.create(guestPost)
                .catch(error => { throw new SystemError(error.message) })
                .then(() => { })
        })
}

export default createGuestPost