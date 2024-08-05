import validate from "../../com/validate"
import errors, { SystemError } from "../../com/errors"

const registerUser = (name, surname, username, email, password, passwordRepeat) => {
    // Validaciones
    validate.name(name)
    validate.surname(surname)
    validate.username(username)
    validate.email(email)
    validate.password(password)
    validate.passwordMatch(password, passwordRepeat)


    return fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, surname, username, email, password, passwordRepeat })
    })
        .then(response => {
            if (response.status === 201) {
                return
            } else {
                return response.json().then(body => {
                    const { error, message } = body
                    const constructor = errors[error] || SystemError
                    throw new constructor(message)
                })
            }
        })
        .catch(() => {
            throw new SystemError('server error')
        })
}

export default registerUser
