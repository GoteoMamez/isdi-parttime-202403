import View from "../../../../components/library/View";
import GuestPost from "./GuestPost";

import logic from "../../../logic";
import { useEffect, useState } from "react";

import { useContext } from "react"
import Context from "../../../Context"

function GuestPostList({ refreshStamp, onGuestPostDeleted }) {
    console.log('GuestPostList -> render')

    const { alert } = useContext(Context)

    const [posts, setPosts] = useState([])

    useEffect(() => {


        loadPosts()
    }, [refreshStamp])

    const loadPosts = () => {
        try {
            logic.getGuestPost()
                .then(posts => {
                    const now = new Date()
                    const validPosts = posts.filter(post => new Date(post.date) >= now)

                    setPosts(validPosts.reverse())
                })
                .catch((error) => {
                    console.error(error)
                    alert(error.message)
                    return
                })
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    };

    const handlePostDeleted = () => loadPosts()

    return <View tag="section" className='GuestPostList'>
        {posts.map(post => <GuestPost key={post.id} post={post} onGuestPostDeleted={handlePostDeleted}></GuestPost>)}
    </View>
}

export default GuestPostList