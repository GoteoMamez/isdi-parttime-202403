import './PostList.css'
import './Post.css'


import View from "../../components/library/View"
import Post from "./Post"

import logic from '../../logic'
import { useEffect, useState } from 'react'

function PostList() {
    console.log('PostList -> render')

    const [posts, setPosts] = useState([])

    useEffect(() => {
        console.log('PostList -> useEffect')

        loadPosts()
    }, [])

    const loadPosts = () => {
        try {
            logic.getAllPosts((error, posts) => {
                if (error) {
                    console.error(error)

                    alert(error.message)

                    return
                }

                setPosts(posts)
            })

        } catch (error) {
            console.error(error)

            alert(error.message)
        }

    }



    const handlePostDeleted = () => loadPosts()

    return <View tag="section" className='PostList'>

        {posts.map(post => <Post post={post} onPostDeleted={handlePostDeleted} />


        )}


    </View>

}





export default PostList