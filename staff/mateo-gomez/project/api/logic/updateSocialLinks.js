import validate from "com/validate.js"
import { User } from "../models/index.js"
import { NotFoundError, SystemError } from "com/errors.js"

const updateSocialLinks = (userId, socialLinks) => {
    const { twitter, instagram, facebook, youtube } = socialLinks

    if (twitter) validate.twitterUrl(twitter, 'twitter')
    if (instagram) validate.instagramUrl(instagram, 'instagram')
    if (facebook) validate.facebookUrl(facebook, 'facebook')
    if (youtube) validate.youtubeUrl(youtube, 'youtube')

    return User.findById(userId)
        .then(user => {
            if (!user) { throw new NotFoundError('User not found') }

            const currentSocialLinks = user.socialLinks || {}


            //currentSocialLinks.instagram = socialLinks.instagram 
            if (instagram) {
                currentSocialLinks.instagram = instagram

            }
            if (twitter) {
                currentSocialLinks.twitter = twitter
            }

            if (facebook) {
                currentSocialLinks.facebook = facebook
            }

            if (youtube) {
                currentSocialLinks.youtube = youtube
            }




            return user.save()
        })
        .then(updatedUser => {
            return updatedUser
        })
        .catch(error => {
            throw new SystemError(error.message)
        })
}

export default updateSocialLinks