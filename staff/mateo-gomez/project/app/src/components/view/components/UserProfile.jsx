import React, { useEffect, useState } from 'react'
import View from '../../../../components/library/View'
import Image from '../../../../components/core/Image'
import Text from '../../../../components/core/Text'
import GalleryImagesEditor from './GalleryImagesEditor'
import Field from '../../../../components/core/Field'

import logic from '../../../logic/index'

import './UserProfile.css'
import Button from '../../../../components/core/Button'

function UserProfile({ userId, isOwnProfile }) {
    const [user, setUser] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
    const [galleryImages, setGalleryImages] = useState([])

    useEffect(() => {
        if (userId) {
            try {
                logic.getUserProfile(userId)
                    .then(user => {
                        setUser(user)
                        setGalleryImages(user.galleryImages || [])
                    })
                    .catch((error) => {
                        console.error(error)
                        alert(error.message)
                    })
            } catch (error) {
                alert(error.message)
            }
        }
    }, [userId])

    if (!user) {
        return <Text>Loading user profile...</Text>;
    }

    const handleAddImage = () => setGalleryImages([...galleryImages, ''])
    const handleDeleteImage = (index) => setGalleryImages(galleryImages.filter((_, i) => i !== index))
    const handleImageChange = (index, value) => {
        const updatedImages = galleryImages.map((img, i) => (i === index ? value : img))
        setGalleryImages(updatedImages)
    }

    const handleEditToggle = () => setIsEditing(!isEditing)

    const handleUpdateUserProfileForm = (event) => {
        event.preventDefault()

        const updates = {
            username: event.target.username.value,
            name: event.target.name.value,
            surname: event.target.surname.value,
            profileImage: event.target.profileImage.value,
            description: event.target.description.value,
            socialLinks: {
                twitter: event.target.twitterUrl.value,
                instagram: event.target.instagramUrl.value,
                facebook: event.target.facebookUrl.value,
                youtube: event.target.youtubeUrl.value,
            },
            galleryImages
        }

        logic.updateUserProfile(userId, updates)
            .then(() => {
                setIsEditing(false)
            })
            .catch(error => alert(error.message))
    }


    const platformIcons = {
        twitter: "fa-brands fa-twitter",
        instagram: "fa-brands fa-instagram",
        facebook: "fa-brands fa-facebook",
        youtube: "fa-brands fa-youtube"
    }
    return (
        <div className='UserProfile'>
            {isEditing ? (
                <form onSubmit={handleUpdateUserProfileForm}>
                    <div className='profileContainer'>
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
                </form>
            ) : (
                <div className='profileContainer'>
                    <div className='ProfileInfo'>
                        <div className='profileImageContainer'>
                            <Image className='profileImage' src={user.profileImage} alt='User Profile' />
                            <Text className='UserNameTitle'>{user.username}</Text>
                        </div>

                        <div className='SocialLinksContainer'>
                            <Button onClick={handleEditToggle} className='EditProfileButton'>Edit Profile</Button>
                            {Object.entries(user.socialLinks || {}).map(([platform, link]) => (
                                link && (
                                    <a key={platform} href={link} target="_blank" rel="noopener noreferrer" className='SocialLink'>
                                        <i className={platformIcons[platform]}></i>
                                    </a>
                                )
                            ))}
                        </div>
                    </div>

                    <div className='ProfileDescription'>
                        <Text className='UserDescription'>{user.description}</Text>
                    </div>

                    <div className='ImageGalleryContainer'>
                        {user.galleryImages && user.galleryImages.map((image, index) => (
                            <Image key={index} className='GalleryImages' src={image} />
                        ))}
                    </div>


                </div>
            )}
        </div>
    )
}
export default UserProfile
