import { User, HostPost } from '../models/index.js'
import { NotFoundError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'

const createHostPost = (userId, image, description, city, age, offer) => {
    validate.id(userId)
    validate.url(image, 'image')
    validate.text(description, 'desctiption', 360)
    validate.text(city, 'city')
    validate.age(age, 'age', 3)
    validate.text(offer, 'offer', 50)

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                throw new NotFoundError

            }

            const hostPost = {
                author: userId,
                image,
                description,
                city,
                age,
                offer
            }

            return HostPost.create(hostPost)
                .catch(error => { throw new SystemError(error.message) })
                .then(() => { })
        })
}

export default createHostPost