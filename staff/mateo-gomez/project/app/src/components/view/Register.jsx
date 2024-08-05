import { useState } from "react"
import logic from "../../logic/index"

import Field from "../../../components/core/Field"
import View from "../../../components/library/View"
import FormWithFeedback from "../../../components/library/FormWithFeedBack"
import Title from "../../../components/core/Title"
import SubmitButton from "../../../components/core/SubmitButton"
import Link from "../../../components/core/Link"

function Register({ onLoginClick, onUserRegistered }) {
    const [message, setMessage] = useState('')


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

                    setMessage(error.message)
                })

        } catch (error) {
            console.error(error)

            setMessage(error.message)
        }

    }

    const handleLoginClick = (event) => {
        event.preventDefault()

        onLoginClick()
    }



    return <View tag='main' className='main'>

        <Title className='ViewTitle'>Register</Title>

        <FormWithFeedback onSubmit={handleRegisterSubmit}>
            <Field id='name' type='text' placeholder='name'>name</Field>
            <Field id='surname' type='text' placeholder='surname'>surname</Field>
            <Field id='email' type='email' placeholder='E-Mail'>E-Mail</Field>
            <Field id='username' type='text' placeholder='username'>username</Field>
            <Field id='password' type='password' placeholder='password'>password</Field>
            <Field id='passwordRepeat' type='password' placeholder='Repeat Password'>passwordRepeat</Field>

            <SubmitButton type='submit'>Register</SubmitButton>

        </FormWithFeedback>

        <Link onClick={handleLoginClick}>Login</Link>

    </View>


}

export default Register