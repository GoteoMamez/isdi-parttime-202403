import { useEffect, useState } from "react"
import extractPayloadFromJWT from "../../../utils/extractPayloadFromJWT"
import logic from "../../../logic"
import Form from '../../../../components/core/Form'
import Field from "../../../../components/core/Field"
import GalleryImagesEditor from "./GalleryImagesEditor"

import './UpdateUserProfileForm.css'

function UpdateUserProfileForm({ onUpdateProfile }) {
    const [userId, setUserId] = useState(null)
    const [galleryImages, setGalleryImages] = useState([])


    useEffect(() => {
        let payload
        try {
            if (sessionStorage.token) {
                payload = extractPayloadFromJWT(sessionStorage.token)
                setUserId(payload.sub)
            }

        } catch (error) {
            alert(error.message)
        }
    }, [])

    const handleUpdateUserProfileForm = (event) => {
        event.preventDefault()

        const target = event.target

        const username = target.username.value
        const name = target.name.value
        const surname = target.surname.value
        const profileImage = target.profileImage.value
        const description = target.description.value
        const socialLinks = {
            twitter: target.twitterUrl.value,
            instagram: target.instagramUrl.value,
            facebook: target.facebookUrl.value,
            youtube: target.youtubeUrl.value
        }
        const galleryImages = Array.from(target.querySelectorAll("input[name='galleryImage']")).map(input => input.value);

        const updates = {
            username,
            name,
            surname,
            profileImage,
            description,
            socialLinks,
            galleryImages,
        }


        try {
            logic.updateUserProfile(userId, updates)
                .then(() => {
                    onUpdateProfile()
                })
                .catch((error) => {
                    alert(error.message)
                })
        } catch (error) {
            alert(error.message)
        }
    }

    const handleAddImage = () => setGalleryImages([...galleryImages, ''])
    const handleDeleteImage = (index) => setGalleryImages(galleryImages.filter((_, i) => i !== index))
    const handleImageChange = (index, value) => {
        const updatedImages = galleryImages.map((img, i) => (i === index ? value : img))
        setGalleryImages(updatedImages)
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

                <GalleryImagesEditor
                    galleryImages={galleryImages}
                    onAddImage={handleAddImage}
                    onDeleteImage={handleDeleteImage}
                    onImageChange={handleImageChange}
                />

                <button type="submit">Update Profile</button>
            </div>
        </Form>

    )
}
export default UpdateUserProfileForm