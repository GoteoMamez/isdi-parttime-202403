import errors from "../../com/errors";
import validate from "../../com/validate";

const createHostPost = (image, description, city, age, offer) => {
    validate.url(image, 'image')
    validate.text(description, 'desctiption')
    validate.text(city, 'city')
    validate.text(age, 'age')
    validate.text(offer, 'offer')

    return fetch(`${import.meta.env.VITE_API_URL}/posts/host`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image, description, city, age, offer })
    })
        .catch(error => { throw new SystemError('server error') })
        .then(response => {
            if (response.status === 201) {

                return
            }

            return response.json()
                .catch(error => { throw new SystemError('server error') })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    { throw new constructor(message) }
                })
        })

}

export default createHostPost