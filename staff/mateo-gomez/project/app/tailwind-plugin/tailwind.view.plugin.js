// tailwind.config.js
const plugin = require('tailwindcss/plugin')

export default plugin(({ addComponents }) => {
    addComponents({
        '.View': {
            backgroundColor: 'black',
            textAlign: 'center',
        },
        '.View.column': {
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
        },
    })
})