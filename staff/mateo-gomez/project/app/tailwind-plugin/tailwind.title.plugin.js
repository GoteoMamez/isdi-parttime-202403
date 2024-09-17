// tailwind.config.js
const plugin = require('tailwindcss/plugin')

export default plugin(({ addComponents }) => {
    addComponents({
        '.MainTitle': {
            fontFamily: '"Langar", system-ui',
            color: 'rgb(255, 255, 255)',
            fontSize: '3rem',
        },
    })
})