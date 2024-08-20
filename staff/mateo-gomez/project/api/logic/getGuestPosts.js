import validate from "com/validate.js"
import { User, GuestPost } from "../models/index.js"
import { NotFoundError, SystemError } from "com/errors.js"


const getGuestPosts = (userId) => {
    validate.id(userId, 'userId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                throw new NotFoundError('user not found')
            }

            return GuestPost.find({}).populate('author', 'username').select('-__v').sort({ date: -1 }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(posts => {
                    posts.forEach(post => {
                        post.id = post._id.toString()


                        delete post._id

                        if (post.author._id) {
                            post.author.id = post.author._id.toString()

                            delete post.author._id
                        }
                    })
                    return posts
                })
        })
}

export default getGuestPosts