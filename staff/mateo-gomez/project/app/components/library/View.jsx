function View({ tag: Tag = 'div', className, children, direction = 'column' }) {
    return <Tag className={`View gc={className ? className: ''} ${direction === 'column' ? 'View column' : 'View row'}`}>{children}</Tag>
}

export default View
