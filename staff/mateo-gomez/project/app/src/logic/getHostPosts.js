import errors, { SystemError } from "com/errors";

const getHostPost = () => {

    return fetch(`${import.meta.env.VITE_API_URL}/posts/host`, {
        headers: {
            method: 'GET',
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'

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

export default getHostPost