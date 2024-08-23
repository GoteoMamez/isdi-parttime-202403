import React, { useEffect, useState } from 'react'
import View from '../../../../components/library/View'
import Image from '../../../../components/core/Image'
import Text from '../../../../components/core/Text'

import logic from '../../../logic'

function UserProfile({ userId, isOwnProfile }) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        logic.getUserId(userId)
            .then()
    })

    return (
        <View className='UserProfile'>
            <Image className='profileImage' src={user.profileImage} alt='User Profile'></Image>

            <Text className='UserDescription' tag='textarea' rows='4' placeholder='Introduce yourself and tell evrybody what do you like'>{user.description}</Text>

            <View className='ImageGallery'>
                {user.galleryImages.map((image, index) => (
                    <Image key={index} className='GalleryImages' src={image}></Image>
                ))}
            </View>
        </View>
    )

}

export default UserProfile

