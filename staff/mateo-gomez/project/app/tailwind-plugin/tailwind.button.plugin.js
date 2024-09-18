
// tailwind.config.js
const plugin = require('tailwindcss/plugin')

export default plugin(({ addComponents }) => {
    addComponents({

        '.Button': {
            borderRadius: '8px',
            border: '1px solid transparent',
            padding: '0.6em 1.2em',
            fontSize: '1em',
            fontWeight: '400',
            backgroundColor: '#8A8888',
            cursor: 'pointer',
            width: '10rem',
            //'@apply font - langar': {},
            color: 'rgb(15, 15, 15)',
            margin: '2rem',
            transition: 'background-color 0.3s, transform 0.3s, border-color 0.25s',
            fontFamily: 'langar'
        },
        '.Button:hover': {
            backgroundColor: '#5f5f5f',
            transform: 'scale(1.04)',
            border: '0.1vh solid #6e6d6d',
            color: 'white',
        },
        '.LogoutButton': {
            color: 'white',
            width: '4rem',
            backgroundColor: 'black',
            marginTop: '0.2rem',
            padding: '0.3rem 0.3rem',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            fontFamily: '"Langar", system-ui',
            zIndex: '100000'
        },
        '.LogoutButton:hover': {
            backgroundColor: 'transparent',
            border: 'none',
            color: 'white',
        },
        '.PostType': {
            height: '6rem',
            fontSize: 'xx-large',
            color: 'white',
            fontFamily: '"Langar", system-ui',
        }


    })
})


