import { useState } from "react";
import Heading from "../../../../components/core/Heading";
import Button from "../../../../components/core/Button";
import './PostTypeSelection.css'

function PostTypeSelection({ onSelectType }) {
    return <div className="PostTypeSelection">
        <Heading className='PostTypeSelectionHeading' level='1'>What do you want to be?</Heading>
        <Button className='PostType' onClick={() => onSelectType('HostPost')}>Host</Button>
        <Button className='PostType' onClick={() => onSelectType('GuestPost')}>Guest</Button>

    </div>
}

export default PostTypeSelection