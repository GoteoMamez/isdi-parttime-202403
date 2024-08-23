import './ProfileLink.css'

function ProfileLink({ type, className, onClick, children }) {
    return <button className={`ProfileLink ${className ? className : ''}`} type={type} onClick={onClick}>{children}</button>
}

export default ProfileLink