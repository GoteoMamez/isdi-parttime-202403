import validate from "com/validate"
import errors, { MatchError, SystemError } from "com/errors";

const updateGalleryImages = (galleryImages) => {

    if (!Array.isArray(galleryImages)) {
        throw new MatchError('Invalid galleryImages format')
    }
    galleryImages.forEach((image, index) => {
        validate.url(image, `galleryImages[${index}]`)
    })

    return fetch(`${import.meta.env.VITE_API_URL}/users/update/gallery-images`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newGalleryImages: galleryImages })
    })
        .catch(error => { throw new SystemError('server error') })
        .then(response => {

            if (response.status === 200)
                return




            return response.json()
                .catch(() => { throw new SystemError('server error ') })
                .then(body => {


                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })

        })
};

export default updateGalleryImages