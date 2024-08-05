import registerUser from '../logic/registerUser.js'


const registerUserHandler = (req, res, next) => {
    const { name, surname, username, email, password, passwordRepeat } = req.body

    try {
        registerUser(name, surname, username, email, password, passwordRepeat)
            .then(() => res.status(201).send())
            .catch(error => {
                next(error)
            })

    } catch (error) {
        next(error)
    }
}
export default registerUserHandler
