import View from "../../../../components/library/View";
import GuestPost from "./GuestPost";
import './GuestPostList.css'

import logic from "../../../logic";
import { useEffect, useState } from "react";

function GuestPostList({ refreshStamp, onGuestPostDeleted }) {
    console.log('GuestPostList -> render')

    const [posts, setPosts] = useState([])

    useEffect(() => {
        console.log('GuestPostList -> useEffect')

        loadPosts()
    }, [refreshStamp])

    const loadPosts = () => {
        try {
            logic.getGuestPost()
                .then(posts => setPosts(posts.reverse()))
                .catch((error) => {
                    console.error(error)

                    alert(error.message)

                    return
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handlePostDeleted = () => loadPosts()

    return <View tag="section" className='GuestPostList'>
        {posts.map(post => <GuestPost key={post.id} post={post} onGuestPostDeleted={handlePostDeleted}></GuestPost>)}
    </View>
}

export default GuestPostList