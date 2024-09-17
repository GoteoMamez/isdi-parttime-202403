// tailwind.config.js
const plugin = require('tailwindcss/plugin')

export default plugin(({ addComponents }) => {
    addComponents({
        '.Label': {
            color: 'white',
            fontFamily: '"Langar", system-ui',
            fontWeight: '400',
            fontStyle: 'normal',
            fontSize: 'x-large',
        },
    })
})