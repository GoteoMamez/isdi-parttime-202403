import View from "../../../../components/library/View";
import HostPost from "./HostPost";
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
        {posts.map(post => <HostPost key={post.id} post={post} onPostDeleted={handlePostDeleted}></HostPost>)}
    </View>
}

export default HostPostList