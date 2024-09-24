// tailwind.config.js
const plugin = require('tailwindcss/plugin')

export default plugin(({ addComponents }) => {
    addComponents({
        '.Link': {
            color: 'purple',
            fontFamily: '"Langar", system-ui',
            fontWeight: '400',
            fontSize: 'large',
        },

    })
})