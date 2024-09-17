// tailwind.config.js
const plugin = require('tailwindcss/plugin')

export default plugin(({ addComponents }) => {
    addComponents({
        '.HostPostList': {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            padding: '1rem',
        },
        '.PostList': {
            display: 'flex',
            justifyContent: 'center',
        },
    })
})