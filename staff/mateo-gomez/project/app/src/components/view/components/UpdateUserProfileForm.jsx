import { useEffect, useState } from "react"
import extractPayloadFromJWT from "../../../utils/extractPayloadFromJWT"
import logic from "../../../logic"
import Form from '../../../../components/core/Form'
import Field from "../../../../components/core/Field"
import Button from "../../../../components/core/Button"

import { useContext } from "react"
import Context from "../../../Context"


function UpdateUserProfileForm() {

    const { alert } = useContext(Context)

    const handleUpdateUserProfileForm = (event) => {
        event.preventDefault()

        const target = event.target

        const updates = {
            username: target.username.value,
            name: target.name.value,
            surname: target.surname.value,
            profileImage: target.profileImage.value,
            description: target.description.value,
        }

        const socialLinks = {
            twitter: target.twitterUrl.value,
            instagram: target.instagramUrl.value,
            facebook: target.facebookUrl.value,
            youtube: target.youtubeUrl.value
        }


        try {
            if (!Object.values(updates).every(field => field === null || field === '')) {
                logic.updateUserProfile(updates)
                    .then(() => {
                        alert('usuario actualizado')
                    })
                    .catch((error) => {
                        console.error(error)
                        alert(error.message)
                    })
            }

            if (!Object.values(socialLinks).every(field => field === null || field === '')) {
                logic.updateSocialLinks(socialLinks)
                    .then(() => {
                        alert('usuario actualizado')

                    })
                    .catch((error) => {
                        console.error(error)
                        alert(error.message)
                    })
            }


        } catch (error) {
            alert(error.message)
        }
    }



    return (
        <Form onSubmit={handleUpdateUserProfileForm} className="profileContainerUpdateForm">
            <div className="profileContainerUpdateForm">
                <Field id="username" type="text" placeholder="Username">Username</Field>
                <Field id="name" type="text" placeholder="Name">Name</Field>
                <Field id="surname" type="text" placeholder="Surname">Surname</Field>
                <Field id="profileImage" type="text" placeholder="Profile Image URL">Profile Image URL</Field>
                <Field id="description" type="text" placeholder="Description">Description</Field>

                <Field id="twitterUrl" type="text" placeholder="Twitter URL">Twitter URL</Field>
                <Field id="instagramUrl" type="text" placeholder="Instagram URL">Instagram URL</Field>
                <Field id="facebookUrl" type="text" placeholder="Facebook URL">Facebook URL</Field>
                <Field id="youtubeUrl" type="text" placeholder="YouTube URL">YouTube URL</Field>



                <Button type="submit">Update Profile</Button>
            </div>
        </Form>
    )
}

export default UpdateUserProfileForm