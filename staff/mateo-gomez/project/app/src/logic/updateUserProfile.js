import errors, { SystemError } from "com/errors"
import validate from "com/validate"

const updateUserProfile = (updates) => {

    if (updates) {

        if (updates.username) {
            validate.username(updates.username)
        }

        if (updates.email) {
            validate.email(updates.email)
        }

        if (updates.name) {
            validate.name(updates.name, "name")
        }

        if (updates.surname) {
            validate.name(updates.surname, "surname")
        }

        if (updates.profileImage) {
            validate.url(updates.profileImage, "profileImage")
        }

        if (updates.description) {
            validate.text(updates.description, "description", 700)
        }


        return fetch(`${import.meta.env.VITE_API_URL}/users/update`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${sessionStorage.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updates)

        })
            .catch(error => { throw new SystemError('server error') })
            .then(response => {
                if (response.status === 200) //respuesta de 200-299

                    return

                return response.json()
                    .catch((error) => { throw new SystemError(error.message) })
                    .then((body) => {
                        const { error, message } = body

                        const constructor = errors[error]

                        throw new constructor(message)
                    })
            })



    }
}
export default updateUserProfile