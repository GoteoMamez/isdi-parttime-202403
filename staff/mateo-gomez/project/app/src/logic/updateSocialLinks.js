import errors, { SystemError } from "com/errors"
import validate from "com/validate"

const updateSocialLinks = (socialLinks) => {


    const { twitter, instagram, facebook, youtube } = socialLinks
    if (twitter) {
        validate.twitterUrl(twitter, 'twitter')
    }

    if (instagram) {
        validate.instagramUrl(instagram, 'instagram')
    }

    if (facebook) {
        validate.facebookUrl(facebook, 'facebook')
    }

    if (youtube) {
        validate.youtubeUrl(youtube, 'youtube')
    }



    return fetch(`${import.meta.env.VITE_API_URL}/users/update/social-links`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ socialLinks })
    })
        .catch(error => { throw new SystemError('server error') })
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

export default updateSocialLinks