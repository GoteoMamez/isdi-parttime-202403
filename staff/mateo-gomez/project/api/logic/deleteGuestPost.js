import { MatchError, NotFoundError, SystemError } from "com/errors.js"
import { GuestPost, User } from "../models/index.js"
import { Types } from "mongoose"
import validate from 'com/validate.js'

const { ObjectId } = Types


const deleteGuestPost = (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                throw new NotFoundError('user not found')
            }

            return GuestPost.findById(postId)
                .catch(error => { throw new SystemError(error.message) })
                .then(post => {
                    if (!post) {
                        throw new NotFoundError('post not found')
                    }

                    if (post.author.toString() !== userId) {
                        throw new MatchError('post author does not match user')
                    }

                    return GuestPost.deleteOne({ _id: new ObjectId(postId) })
                        .catch(error => { throw new SystemError(error.message) })
                        .then(() => { })
                })
        })
}

export default deleteGuestPost