import React, { useEffect, useState } from 'react'
import View from '../../../../components/library/View'
import Image from '../../../../components/core/Image'
import Text from '../../../../components/core/Text'


import logic from '../../../logic/index'

import './UserProfile.css'
import Button from '../../../../components/core/Button'
import UpdateUserProfileForm from './UpdateUserProfileForm'

function UserProfile({ userId, isOwnProfile }) {
    const [user, setUser] = useState(null)
    const [isEditing, setIsEditing] = useState(false)


    useEffect(() => {
        if (userId) {
            try {
                logic.getUserProfile(userId)
                    .then(user => {
                        setUser(user)
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



    const handleEditToggle = () => setIsEditing(!isEditing)




    const platformIcons = {
        twitter: "fa-brands fa-twitter",
        instagram: "fa-brands fa-instagram",
        facebook: "fa-brands fa-facebook",
        youtube: "fa-brands fa-youtube"
    }
    return (
        <div className='UserProfile'>
            {isEditing ? (
                <UpdateUserProfileForm onUpdateProfile={() => setIsEditing(false)}></UpdateUserProfileForm>
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
