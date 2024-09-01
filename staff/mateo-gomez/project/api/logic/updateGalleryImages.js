import validate from "com/validate.js";
import { User } from "../models/index.js";
import { MatchError, NotFoundError, SystemError } from "com/errors.js";

const updateGalleryImages = (userId, newGalleryImages) => {

    if (!Array.isArray(newGalleryImages)) {
        throw new MatchError('galleryImages must be an array');
    }

    newGalleryImages.forEach((image, index) => {
        validate.url(image, `galleryImages[${index}]`)
    })
    return User.findById(userId)
        .then(user => {
            if (!user) { throw new NotFoundError('User not found') }


            const currentGalleryImages = user.galleryImages || []

            //nuevo array con las imagenes nuevas y antiguas 
            const updatedGalleryImages = [...currentGalleryImages.filter(img => !newGalleryImages.includes(img)), ...newGalleryImages]

            user.galleryImages = updatedGalleryImages
            return user.save()
        })
        .then(updatedUser => {
            return updatedUser
        })
        .catch(error => {
            throw new SystemError(error.message)
        })


}

export default updateGalleryImages