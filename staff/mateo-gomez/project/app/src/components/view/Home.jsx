import { useEffect, useState } from "react"
import View from "../../../components/library/View"
import Heading from "../../../components/core/Heading"
import Header from "./components/Header"
import logic from "../../logic/index"
import Button from "../../../components/core/Button"
import Footer from "./components/Footer"


function Home({ onUserLoggedOut }) {
    console.log('Home -> render')

    const [name, setName] = useState('')
    const [view, setView] = useState('')


    const handleLogout = () => {
        logic.logoutUser()

        onUserLoggedOut()
    }


    const handleCreatePostClick = () => {
        setView('createPost')
    }

    const handlePostCreated = () => {
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
        <View tag="main">

        </View>
        <Footer onCreatePostClick={handleCreatePostClick} className='Footer' >+</Footer>
    </View>
}

export default Home