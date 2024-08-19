import View from "../../../../components/library/View";
import Post from "./Post";
import './HostPostList.css'

import logic from "../../../logic";
import { useEffect, useState } from "react";

function GuestPostList({ refreshStamp }) {
    console.log('GuestPostList -> render')

    const [posts, setPosts] = useState([])

    useEffect(() => {
        console.log('GuestPostList -> useEffect')

        loadPosts()
    }, [refreshStamp])

    const loadPosts = () => {
        try {
            logic.getHostPost()
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
        {posts.map(post => <Post key={post.id} post={post} onPostDeleted={handlePostDeleted}></Post>)}
    </View>
}

export default GuestPostList