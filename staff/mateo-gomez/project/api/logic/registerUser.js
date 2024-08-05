import validate from "../../com/validate.js"
import { User } from "../models/index.js"
import { DuplicityError, SystemError } from "../../com/errors.js"
import bcrypt from "bcryptjs"


const registerUser = (name, surname, username, email, password, passwordRepeat) => {
    validate.name(name)
    validate.surname(surname)
    validate.username(username)
    validate.email(email)
    validate.password(password)
    validate.passwordMatch(password, passwordRepeat)

    return User.findOne({ $or: [{ username }, { email }] })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (user) {
                throw new DuplicityError('username already exists')
            }

            return bcrypt.hash(password, 8)
                .catch(error => { throw new SystemError(error.message) })
                .then(hash => {
                    const newUser = {
                        name: name,
                        surname: surname,
                        username: username,
                        email: email,
                        password: hash,
                    }

                    User.create(newUser)
                        .catch(error => { throw new SystemError(error.message) })
                        .then(() => { })
                })
        })
}

export default registerUser