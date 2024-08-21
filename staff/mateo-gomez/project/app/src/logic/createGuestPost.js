import { SystemError } from "../../com/errors";
import validate from "../../com/validate";

const createGuestPost = (image, description, date, age, fromLocation, toLocation) => {
    validate.url(image, 'image')
    validate.text(description, 'desctiption')
    validate.text(date, 'city')
    validate.text(age, 'age')
    validate.text(fromLocation, 'fromLocation')
    validate.text(toLocation, 'toLocation')

    return fetch(`${import.meta.env.VITE_API_URL}/posts/guest`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image, description, date, age, fromLocation, toLocation })
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

export default createGuestPost