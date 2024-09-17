import Button from '../../../../components/core/Button'


function Footer({ onCreatePostClick, onViewProfileClick }) {
    const handleCreatePostClick = () => onCreatePostClick()

    const handleViewProfile = () => onViewProfileClick()

    return <footer className='Footer'>
        <Button onClick={handleViewProfile} className='ProfileUserButton'>
            <i className="fa-solid fa-user"></i>
        </Button>
        <Button onClick={handleCreatePostClick} className='FooterButton'>
            <i className="fa-solid fa-plus" ></i>
        </Button>

    </footer>
}

export default Footer