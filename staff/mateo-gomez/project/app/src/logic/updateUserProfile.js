import errors, { SystemError } from "com/errors";
import validate from "com/validate"

const updateUserProfile = (userId, updates) => {
    validate.id(userId, 'userId')

    if (updates.username) validate.username(updates.username);
    if (updates.email) validate.email(updates.email);
    if (updates.name) validate.name(updates.name, "name");
    if (updates.surname) validate.name(updates.surname, "surname");
    if (updates.profileImage) validate.url(updates.profileImage, "profileImage");
    if (updates.description) validate.text(updates.description, "description", 700);
    if (updates.socialLinks) {
        const { twitter, instagram, facebook, youtube } = updates.socialLinks;
        if (twitter) validate.twitterUrl(twitter, "twitter");
        if (instagram) validate.instagramUrl(instagram, "instagram");
        if (facebook) validate.facebookUrl(facebook, "facebook");
        if (youtube) validate.youtubeUrl(youtube, "youtube");
    }

    if (updates.galleryImages) {
        if (!Array.isArray(updates.galleryImages)) {
            throw new errors.ValidationError("galleryImages must be an array");
        }
        updates.galleryImages.forEach((image, index) => {
            validate.url(image, `galleryImages[${index}]`);
        });
    }

    return fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/update`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updates)

    })
        .catch(error => { throw new SystemError('error server') })
        .then(response => {
            if (response.status === 200)

                return

            return response.json()
                .catch(() => { throw new SystemError('server error ') })
                .then((body) => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })



}

export default updateUserProfile