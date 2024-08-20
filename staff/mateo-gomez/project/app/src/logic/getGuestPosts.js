import errors, { SystemError } from "com/errors";

const getGuestPost = () => {

    return fetch(`${import.meta.env.VITE_API_URL}/posts/guest`, {
        headers: {
            method: 'GET',
            Authorization: `Bearer ${sessionStorage.token}`

        }

    })

        .catch(error => { throw new SystemError('server error') })
        .then(response => {
            if (response.status === 200) {

                return response.json()
                    .catch(error => { throw new SystemError('server error') })
                    .then(posts => {
                        return posts
                    })
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

export default getGuestPost