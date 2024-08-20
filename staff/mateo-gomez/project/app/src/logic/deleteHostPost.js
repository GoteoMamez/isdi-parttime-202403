import { SystemError } from "com/errors"
import validate from "com/validate"


const deleteHostPost = (postId) => {
    validate.id(postId, 'postId')

    return fetch(`${import.meta.env.VITE_API_URL}/posts/host/${postId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`
        }
    })

        .catch(error => { throw new SystemError('server error') })
        .then(response => {
            if (response.status === 204) {

                return
            }

            return response.json()
                .catch(error => { throw new SystemError('server error') })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

export default deleteHostPost