import Heading from "./Heading"


function Title({ className, children }) {
    return <Heading className={`MainTitle ${className ? className : ''}`} level='1'>{children}</Heading>
}

export default Title