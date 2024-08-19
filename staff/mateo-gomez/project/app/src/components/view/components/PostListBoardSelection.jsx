import { useState } from "react"
import Button from "../../../../components/core/Button"

import './PostListBoardSelection.css'

function PostListBoardSelection() {
    const [view, setView] = useState('')

    const handleGuestPostList = () => {
        setView('GuestPostList')
    }

    const handleHostPostList = () => {
        setView('HostPostList')
    }



    return <div className="PostListBoardSelection">
        <Button className='HostBoardButton' onClick={handleHostPostList}>Hosts</Button>
        <Button className='GuestBoardButton' onClick={handleGuestPostList}>Guests</Button>
    </div>
}

export default PostListBoardSelection