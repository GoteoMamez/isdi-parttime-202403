
function Image({ src, className }) {
    return <img className={`Image ${className ? className : ''}`} src={src}></img>
}

export default Image