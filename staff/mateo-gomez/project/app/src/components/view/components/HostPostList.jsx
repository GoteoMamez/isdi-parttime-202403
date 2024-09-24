import View from "../../../../components/library/View";
import HostPost from "./HostPost";


import logic from "../../../logic";
import { useEffect, useState } from "react";
import LocationFilter from "./LocationFilter";

import { useContext } from "react"
import Context from "../../../Context"

function HostPostList({ refreshStamp, onHostPostDeleted }) {
    console.log('HostPostList -> render')

    const { alert } = useContext(Context)

    const [posts, setPosts] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([])
    const [selectedCity, setSelectedCity] = useState('')


    useEffect(() => {


        loadPosts()
    }, [refreshStamp])

    const loadPosts = () => {
        try {
            logic.getHostPost()
                .then(posts => {
                    setPosts(posts)
                    setFilteredPosts(posts.reverse())
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
    }

    const handleFilteredChange = (city) => {
        setSelectedCity(city)
        if (city === '') {
            setFilteredPosts(posts)
        } else {

            setFilteredPosts(posts.filter(post => post.city === city))
        }
    };


    const handlePostDeleted = () => loadPosts()



    return <View tag="section" className='HostPostList'>
        <LocationFilter posts={posts} onFilteredChange={handleFilteredChange}></LocationFilter>
        {filteredPosts.map(post => <HostPost key={post.id} post={post} onHostPostDeleted={handlePostDeleted}></HostPost>)}
    </View>
}

export default HostPostList