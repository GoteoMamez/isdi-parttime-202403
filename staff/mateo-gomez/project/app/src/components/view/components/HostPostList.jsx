import View from "../../../../components/library/View";
import Post from "./Post";
import './HostPostList.css'

import logic from "../../../logic";
import { useEffect, useState } from "react";

function HostPostList({ refreshStamp }) {
    console.log('HostPostList -> render')

    const [posts, setPosts] = useState([])

    useEffect(() => {
        console.log('HostPostList -> useEffect')

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

    return <View tag="section" className='HostPostList'>
        {posts.map(post => <Post key={post.id} post={post} onPostDeleted={handlePostDeleted}></Post>)}
    </View>
}

export default HostPostList