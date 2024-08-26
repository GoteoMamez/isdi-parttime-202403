import { useEffect, useState } from "react"
import extractPayloadFromJWT from "../../../utils/extractPayloadFromJWT"
import updateUserProfile from "../../../logic/index"
import logic from "../../../logic"


function UpdateUserProfileForm({ onUpdateProfile }) {
    const [userId, setUserId] = useState(null)


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

        username = target.username.value,
            name = target.name.value,
            surname = target.surname.value,
            profileImage = target.profileImage.value,
            description = target.description.value,
            socialLinks = {
                twitter: target.twitterUrl.value,
                instagram: target.instagramUrl.value,
                facebook: target.facebookUrl.value,
                youtube: target.youtubeUrl.value
            },
            galleryImages = Array.from(target.querySelectorAll("input[name='galleryImage']")).map(input => input.value);

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


    return (
        <form onSubmit={handleUpdateUserProfileForm}>
            <div className="profileContainer">
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
                    galleryImages={formData.galleryImages}
                    onAddImage={handleAddImage}
                    onDeleteImage={handleDeleteImage}
                    onImageChange={handleImageChange}
                />

                <button type="submit">Update Profile</button>
            </div>
        </form>

    )
}
export default UpdateUserProfileForm