import { Link } from 'react-router-dom'
import './ProfileLink.css'

function ProfileLink({ userId, className, children }) {
    return (
        <Link
            to={`/users/${userId}/profile`}
            className={`ProfileLink ${className ? className : ''}`}
        >
            {children}
        </Link>
    )
}

export default ProfileLink