import Image from "./Image"
import { useState } from "react"

import 'UserProfileImage.css'

const UserProfileImage = ({ Image }) => {
    const [imageOpen, setImageOpen] = useState()

    const handleOpenImage = () => {
        setImageOpen(true)

    }

    const handleCloseImage = () => {
        setImageOpen(false)
    }

    return (
        <div className="userProfileImage">
            <Image onClick={handleOpenImage} className='ProfileImage'></Image>
        </div>
    )
}

export default UserProfileImage