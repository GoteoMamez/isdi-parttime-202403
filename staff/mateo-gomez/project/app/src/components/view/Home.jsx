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
import PostListBoardSelection from "./components/PostListBoardSelection"

function Home({ onUserLoggedOut }) {
    console.log('Home -> render')

    const [name, setName] = useState('')
    const [view, setView] = useState('')
    const [postType, setPostType] = useState(null)
    const [postListRefreshStamp, setPostListRefreshStamp] = useState(0)


    const handleLogout = () => {
        logic.logoutUser()

        onUserLoggedOut()
    }


    const handleCreatePostClick = () => {
        setView('postTypeSelection')
    }

    const handlePostTypeSelection = (type) => {
        console.log('Post Type Selected', type)
        setPostType(type)

        setView('createPost')
    }

    const handleCancelCreatePost = () => {
        setView('')
    }

    const handlePostCreated = () => {
        setPostListRefreshStamp(Date.now())

        setView('')
    }


    useEffect(() => {
        try {
            logic.getUserName(name)
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
    }, [])



    return <View>
        <Header>
            <Heading className='ConnecttooTitle' level='2'>Connecttoo</Heading>
            <div className="HeaderRight" >
                <Heading className='UserNameHeading' level='3'>{name}</Heading>
                <Button className='Button LogoutButton' onClick={handleLogout}>Logout</Button>
            </div>

        </Header>

        <PostListBoardSelection></PostListBoardSelection>
        <View tag="main">
            <HostPostList refreshStamp={postListRefreshStamp}></HostPostList>
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

        </View>
        <Footer onCreatePostClick={handleCreatePostClick} className='Footer' >+</Footer>
    </View>
}

export default Home