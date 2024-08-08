import { User, GuestPost } from '../models/index.js'
import { NotFoundError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'

const createGuestPost = (userId, image, description, date, age, fromLocation, toLocation) => {
    validate.id(userId)
    validate.url(image, 'image')
    validate.text(description, 'desctiption', 360)
    validate.text(date, 'date')
    validate.age(age, 'age', 3)
    validate.text(fromLocation, 'fromLocation')
    validate.text(toLocation, 'toLocation')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                throw new NotFoundError

            }

            const guestPost = {
                author: userId,
                image,
                description,
                date: new Date,
                age,
                fromLocation,
                toLocation
            }

            return GuestPost.create(guestPost)
                .catch(error => { throw new SystemError(error.message) })
                .then(() => { })
        })
}

export default createGuestPost