// tailwind.config.js
const plugin = require('tailwindcss/plugin')

export default plugin(({ addComponents }) => {
    addComponents({
        '.GuestPostList': {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            padding: '1rem',
            marginTop: '13vh',
        },
        '.PostList': {
            display: 'flex',
            justifyContent: 'center',
        },
    })
})