// tailwind.config.js
const plugin = require('tailwindcss/plugin')

export default plugin(({ addComponents }) => {
    addComponents({
        '.Footer': {
            backgroundColor: 'rgb(84, 84, 84)',
            width: '100%',
            display: 'flex',
            position: 'fixed',
            bottom: '0',
            justifyContent: 'space-around',
            boxSizing: 'content-box',
            height: '4rem',
            zIndex: '100',
            left: '0',
        },
        '.FooterButton': {
            display: 'flex',
            justifyContent: 'center',
            width: '4rem',
            height: '4rem',
            fontSize: 'x-large',
            margin: '0',
        },
        '.Button.ProfileUserButton': {
            height: 'auto',
            display: 'flex',
            justifyContent: 'center',
            margin: '0',
            textAlign: 'center',
            fontSize: 'x-large',
            width: '7vh',
        },
    })
})