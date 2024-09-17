import { useState } from "react"
import Button from "../../../../components/core/Button"
import GuestPostList from "./GuestPostList"
import HostPostList from "./HostPostList"



function PostListBoardSelection({ onViewChange }) {

    const handleGuestPostList = () => {
        onViewChange('GuestPostList')
    }

    const handleHostPostList = () => {
        onViewChange('HostPostList')
    }



    return <div className="PostListBoardSelection">
        <Button className='HostBoardButton' onClick={handleHostPostList}>Hosts</Button>
        <Button className='GuestBoardButton' onClick={handleGuestPostList}>Guests</Button>


    </div>
}

export default PostListBoardSelection