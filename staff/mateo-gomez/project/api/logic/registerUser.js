import validate from "../../com/validate.js"
import { User } from "../models/index.js"
import { DuplicityError, SystemError } from "../../com/errors.js"
import bcrypt from "bcryptjs"


const registerUser = (name, surname, username, email, password, passwordRepeat, profileImage, description, galleryImages, socialLinks) => {
    validate.name(name)
    validate.surname(surname)
    validate.username(username)
    validate.email(email)
    validate.password(password)
    validate.passwordMatch(password, passwordRepeat)

    if (profileImage) validate.url(profileImage, 'profileImage')
    if (description) validate.text(description, 'description')

    if (Array.isArray(galleryImages)) {
        galleryImages.forEach((image, index) => {
            if (image) validate.url(image, `galleryImage[${index}]`)
        })
    }

    if (socialLinks) {
        const { twitter, instagram, facebook, youtube } = socialLinks
        if (twitter) validate.twitterUrl(twitter, 'twitter')
        if (instagram) validate.instagramUrl(instagram, 'instagram')
        if (facebook) validate.facebookUrl(facebook, 'facebook')
        if (youtube) validate.youtubeUrl(youtube, 'youtube')
    }


    return User.findOne({ $or: [{ username }, { email }] })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (user) {
                throw new DuplicityError('username already exists')
            }

            return bcrypt.hash(password, 8)
                .catch(error => { throw new SystemError(error.message) })
                .then(hash => {
                    const newUser = {
                        name: name,
                        surname: surname,
                        username: username,
                        email: email,
                        password: hash,
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

                    User.create(newUser)
                        .catch(error => { throw new SystemError(error.message) })
                        .then(user => {

                            return user

                        })
                })
        })
}

export default registerUser