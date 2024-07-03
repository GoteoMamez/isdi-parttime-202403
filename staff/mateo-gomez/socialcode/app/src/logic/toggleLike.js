import errors from "com/errors.js"
import validate from "com/validate.js"

const toggleLike = (postId, callback) => {
    validate.id(postId)
    validate.callback(callback)

    const xhr = new XMLHttpRequest()

    xhr.onload = () => {
        if (xhr.status === 200) {
            callback(null)
            return
        }

        const { error, message } = JSON.parse(xhr.response)
        const constructor = errors[error]
        callback(new constructor(message))
    }
    xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/posts/${postId}/likes`)
    xhr.setRequestHeader('Authorization', `Bearer ${sessionStorage.token}`)
    xhr.setRequestHeader('Content-Type', 'application/json')

    xhr.send()
}

export default toggleLike