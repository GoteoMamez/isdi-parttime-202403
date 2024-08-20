import Text from "../../../../components/core/Text"
import Image from "../../../../components/core/Image"
import Button from "../../../../components/core/Button"
import ConfirmDelete from "./ConfirmDelete"

import logic from '../../../logic'


import './Post.css'
import { useState } from "react"

function GuestPost({ post, onGuestPostDeleted }) {
    console.log('Post -> render')
    console.log(post)

    const [showConfirmDelete, setShowConfirmDelete] = useState(false)

    const handleDeletePost = () => setShowConfirmDelete

    const confirmDeletePost = () => {
        try {
            logic.deleteGuestPost(post.id)
                .then(() => onGuestPostDeleted())
                .catch((error) => {
                    console.error(error)

                    alert(error.message)

                    return
                })

        } catch (error) {
            console.error(error)

            alert(error.message)
        }
        onGuestPostDeleted()
        setShowConfirmDelete(false)
    }


    return <article className="Post">

        <Text className='AuthorTitle'>{post.author.username}</Text>
        <Image className='PostImage' src={post.image}></Image>

        <div className="FromToLocation">
            <Text className='FromLocationPost'><b>From: </b>&nbsp;{post.fromLocation}</Text>
            <Text className='ToLocationPost'><b>To: </b>&nbsp;{post.toLocation}</Text>
        </div>

        <Text className='PostDate'><b>Date: </b>&nbsp;{post.date}</Text>
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

export default GuestPost