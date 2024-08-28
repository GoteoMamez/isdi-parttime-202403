import { NotFoundError, SystemError } from "../../com/errors.js"
import validate from "../../com/validate.js"
import { User } from '../models/index.js'

const updateUserProfile = (userId, updates) => {
    validate.id(userId, 'userId')

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

    if (updates.socialLinks) {
        const { twitter, instagram, facebook, youtube } = updates.socialLinks;

        if (twitter) {
            validate.twitterUrl(twitter, 'twitter');
            updateFields.socialLinks = updateFields.socialLinks || {};
            updateFields.socialLinks.twitter = twitter;
        }

        if (instagram) {
            validate.instagramUrl(instagram, 'instagram');
            updateFields.socialLinks = updateFields.socialLinks || {};
            updateFields.socialLinks.instagram = instagram;
        }

        if (facebook) {
            validate.facebookUrl(facebook, 'facebook');
            updateFields.socialLinks = updateFields.socialLinks || {};
            updateFields.socialLinks.facebook = facebook;
        }

        if (youtube) {
            validate.youtubeUrl(youtube, 'youtube');
            updateFields.socialLinks = updateFields.socialLinks || {};
            updateFields.socialLinks.youtube = youtube;
        }
    }

    if (updates.galleryImages && Array.isArray(updates.galleryImages)) {

        updateFields.galleryImages = updateFields.galleryImages || [];

        updates.galleryImages.forEach((imageUrl, index) => {
            validate.url(imageUrl, `galleryImage[${index}]`)
            updateFields.galleryImages.push(imageUrl)
        })
    }


    return User.findByIdAndUpdate(userId, updateFields, { new: true }).select('-__v').lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                throw new NotFoundError('user not found')
            }
            return
        })
}

export default updateUserProfile