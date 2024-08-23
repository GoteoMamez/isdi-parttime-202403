import Text from "../../../../components/core/Text"
import Image from "../../../../components/core/Image"
import Button from "../../../../components/core/Button"
import ConfirmDelete from "./ConfirmDelete"
import ProfileLink from "../../../../components/core/ProfileLink"
import { useState } from "react"

import logic from "../../../logic"


import './Post.css'

function HostPost({ post, onHostPostDeleted }) {
    console.log('Post -> render')
    console.log(post)

    const [showConfirmDelete, setShowConfirmDelete] = useState(false)

    const handleDeletePost = () => setShowConfirmDelete(true)

    const cancelDeletePost = () => setShowConfirmDelete(false)

    const confirmDeletePost = () => {
        try {
            logic.deleteHostPost(post.id)
                .then(() => onHostPostDeleted())
                .catch((error) => {
                    console.error(error)

                    alert(error.message)

                    return
                })

        } catch (error) {
            console.error(error)

            alert(error.message)
        }
        onHostPostDeleted()
        setShowConfirmDelete(false)
    }

    const handleViewProfile = () => {
        if (onViewProfileClick) {
            onViewProfileClick(post.author.id)
        }
    }


    return <article className="Post">

        <Text className='AuthorTitle'>
            <ProfileLink onClick={handleViewProfile}>{post.author.username}</ProfileLink>
        </Text>

        <Image className='PostImage' src={post.image}></Image>

        <div className="CityAgePost">
            <Text className='PostCity'><b>City: </b>&nbsp;{post.city}</Text>
            <Text className='PostAge'><b>Age: </b>&nbsp;{post.age}</Text>
        </div>

        <Text className='PostOffer'><b>Offer:</b>&nbsp;{post.offer}</Text>
        <Text className='PostDescription'><b>Description:</b>&nbsp;{post.description}</Text>

        {post.author.id === logic.getUserId() && <Button className="DeleteButton" onClick={handleDeletePost}>Delete</Button>}

        {showConfirmDelete && (
            <ConfirmDelete
                onConfirmDeletePost={confirmDeletePost}
                onCancelDeletePost={cancelDeletePost}
            />

        )}
    </article>
}

export default HostPost