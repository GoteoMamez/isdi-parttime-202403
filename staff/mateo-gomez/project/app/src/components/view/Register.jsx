import { useState } from "react"
import logic from "../../logic/index"

import Field from "../../../components/core/Field"
import View from "../../../components/library/View"
import FormWithFeedback from "../../../components/library/FormWithFeedBack"
import Title from "../../../components/core/Title"
import SubmitButton from "../../../components/core/SubmitButton"
import Link from "../../../components/core/Link"

import { useContext } from "react"
import Context from "../../Context"

function Register({ onLoginClick, onUserRegistered }) {
    const [message, setMessage] = useState('')

    const { alert } = useContext(Context)

    const handleRegisterSubmit = event => {
        event.preventDefault()

        const form = event.target

        const name = form.name.value
        const surname = form.surname.value
        const username = form.username.value
        const email = form.email.value
        const password = form.password.value
        const passwordRepeat = form.passwordRepeat.value


        try {
            logic.registerUser(name, surname, username, email, password, passwordRepeat)
                .then(() => onUserRegistered())
                .catch(error => {
                    console.log(error)

                    alert(error.message)
                })

        } catch (error) {
            console.error(error)

            alert(error.message)
        }

    }

    const handleLoginClick = (event) => {
        event.preventDefault()

        onLoginClick()
    }



    return <View tag='main' className='main'>

        <Title className='ViewTitle'>Register</Title>

        <FormWithFeedback onSubmit={handleRegisterSubmit}>
            <Field id='name' type='text' placeholder='Pedro'>Name</Field>
            <Field id='surname' type='text' placeholder='Pérez'>Surname</Field>
            <Field id='email' type='email' placeholder='usuario@gmail.com'>Email</Field>
            <Field id='username' type='text' placeholder='username'>Username</Field>
            <Field id='password' type='password' placeholder='password'>Password</Field>
            <Field id='passwordRepeat' type='password' placeholder='Repeat Password'>Repeat Password</Field>

            <SubmitButton type='submit'>Register</SubmitButton>

        </FormWithFeedback>

        <Link className='Link' onClick={handleLoginClick}>Already have an account?
            Login now</Link>

    </View>


}

export default Register