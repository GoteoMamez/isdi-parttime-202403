// tailwind.config.js
const plugin = require('tailwindcss/plugin')

export default plugin(({ addComponents }) => {
    addComponents({
        '.ProfileImage': {
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            objectFit: 'cover',
            cursor: 'pointer',
        },
    })
})