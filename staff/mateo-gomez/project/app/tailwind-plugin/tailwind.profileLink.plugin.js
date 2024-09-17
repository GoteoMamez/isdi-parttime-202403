// tailwind.config.js
const plugin = require('tailwindcss/plugin')

export default plugin(({ addComponents }) => {
    addComponents({
        '.ProfileLink': {
            fontFamily: '"Langar", system-ui',
            color: 'black',
            fontSize: '4vh',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
        },
    })
})