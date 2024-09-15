import { useEffect, useState } from "react"

import View from "../../../components/library/View"
import Heading from "../../../components/core/Heading"
import Header from "./components/Header"
import logic from "../../logic/index"
import Button from "../../../components/core/Button"
import Footer from "./components/Footer"
import CreatePostForm from "./components/CreatePostForm"
import PostTypeSelection from "./components/PostTypeSelection"
import HostPostList from "./components/HostPostList"
import GuestPostList from "./components/GuestPostList"
import PostListBoardSelection from "./components/PostListBoardSelection"
import UserProfile from "./components/UserProfile"
import getUserId from "../../logic/getUserId"
import { useNavigate } from "react-router-dom"

function Home({ setName, view = 'HostPostList', setView }) {
    console.log('Home -> render')


    const [postType, setPostType] = useState(null)
    const [postListRefreshStamp, setPostListRefreshStamp] = useState(0)
    const [profileUserId, setProfileUserId] = useState(null)
    const [isViewingOwnProfile, setIsViewingOwnProfile] = useState(false)
    const navigate = useNavigate()







    const handlePostTypeSelection = (type) => {
        console.log('Post Type Selected', type)
        setPostType(type)

        setView('createPost')
        setHomeView(null)
    }

    const handleCancelCreatePost = () => {
        setView('HostPostList')
    }

    const handlePostCreated = () => {
        setPostListRefreshStamp(Date.now())

        setView('HostPostList')
    }





    useEffect(() => {

        try {
            logic.getUserName()
                .then(name => {
                    console.log('Home -> setName')

                    setName(name)
                })
                .catch((error) => {
                    console.error(error)

                    alert(error.message)
                })


        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }, [view])




    return <View className='main'>


        {view !== 'UserProfile' && (
            <PostListBoardSelection onViewChange={setView} />
        )}

        <div className="PostList">
            {view === 'GuestPostList' && <GuestPostList refreshStamp={postListRefreshStamp} />}
            {view === 'HostPostList' && <HostPostList refreshStamp={postListRefreshStamp} />}

        </div>


        <div tag="main">
            {view === 'postTypeSelection' && (
                <PostTypeSelection onSelectType={handlePostTypeSelection}></PostTypeSelection>
            )}
            {view === 'createPost' && postType && (
                <CreatePostForm
                    postType={postType}
                    onCancelCreatePostClick={handleCancelCreatePost}
                    onHostPostCreated={handlePostCreated}
                    onGuestPostCreated={handlePostCreated}
                > </CreatePostForm>
            )}


        </div>

    </View>
}

export default Home