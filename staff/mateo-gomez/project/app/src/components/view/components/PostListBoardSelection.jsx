import { useState } from "react"
import Button from "../../../../components/core/Button"
import GuestPostList from "./GuestPostList"
import HostPostList from "./HostPostList"

import './PostListBoardSelection.css'

function PostListBoardSelection({ refreshStamp }) {
    const [view, setView] = useState('HostPostList')

    const handleGuestPostList = () => {
        setView('GuestPostList')
    }

    const handleHostPostList = () => {
        setView('HostPostList')
    }



    return <div className="PostListBoardSelection">
        <Button className='HostBoardButton' onClick={handleHostPostList}>Hosts</Button>
        <Button className='GuestBoardButton' onClick={handleGuestPostList}>Guests</Button>

        {view === 'GuestPostList' && <GuestPostList refreshStamp={refreshStamp} />}
        {view === 'HostPostList' && <HostPostList refreshStamp={refreshStamp} />}


    </div>
}

export default PostListBoardSelection