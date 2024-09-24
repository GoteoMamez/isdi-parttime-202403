import './Link.css'

function Link({ onClick, className, children }) {
    return <a className={className} href="" onClick={onClick}>{children}</a>
}

export default Link