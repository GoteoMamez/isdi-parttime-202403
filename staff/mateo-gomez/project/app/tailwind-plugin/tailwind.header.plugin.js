// tailwind.config.js
const plugin = require('tailwindcss/plugin')

export default plugin(({ addComponents }) => {
    addComponents({
        '.Header': {
            display: 'flex',
            gap: '1rem',
            width: '100%',
            height: '12vh',
            justifyContent: 'space-between',
            position: 'fixed',
            backgroundColor: 'rgb(0, 0, 0)',
            top: '0',
            padding: '.5vh',
            boxSizing: 'content-box',
            paddingRight: '5vh',
            paddingLeft: '1vh',
            zIndex: '100000',
        },

    })
})