// tailwind.config.js
const plugin = require('tailwindcss/plugin')

export default plugin(({ addComponents }) => {
    addComponents({
        '.PostTypeSelection': {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'fixed',
            width: '100%',
            top: '10rem',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'black',
            width: '30rem',
            borderRadius: '3rem',
        },
        '.PostTypeSelectionHeading': {
            color: 'white',
            fontFamily: '"Langar", system-ui',
        },
    })
})