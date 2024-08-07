import Button from '../../../../components/core/Button'
import './Footer.css'

function Footer({ onCreatePostClick }) {
    const handleCreatePostClick = () => onCreatePostClick()

    return <footer className='Footer'>
        <Button onClick={handleCreatePostClick} className='FooterButton'>+</Button>
    </footer>
}

export default Footer