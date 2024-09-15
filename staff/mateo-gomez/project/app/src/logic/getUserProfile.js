import validate from "../../com/validate"
import errors, { SystemError } from "../../com/errors"

const getUserProfile = (userId) => {


    validate.id(userId)

    return fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/profile`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.token}`
        }
    })
        .catch(() => { throw new SystemError('server error') })
        .then(response => {
            if (response.status === 200) {
                return response.json()
                    .catch(() => { throw new SystemError('server error') })
                    .then((user) => user)
            }

            return response.json()
                .catch(() => { throw new SystemError('server error') })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
        .catch(() => { throw new SystemError('Server error') })
}

export default getUserProfile