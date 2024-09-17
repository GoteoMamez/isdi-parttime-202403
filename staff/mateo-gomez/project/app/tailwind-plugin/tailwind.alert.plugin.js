// tailwind.config.js
const plugin = require('tailwindcss/plugin')

export default plugin(({ addComponents, addUtilities }) => {
    addComponents({
        '.ConfirmAlertForm': {
            zIndex: '1000',
            position: 'fixed',
            top: '20vh',
            width: 'auto',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'white',
            borderRadius: '2rem',
            left: '50%',
            transform: 'translate(-50%)',
        },
        '.ConfirmAlertOverlay': {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            zIndex: '1000',
        },
        '.AlertConfirmButton': {
            backgroundColor: 'rgb(39, 158, 212)',
            transitionProperty: 'background-color, transform',
            transitionDuration: '0.3s',
        },
        '.AlertButtons': {
            display: 'flex',
            justifyContent: 'center',
        },
        '.ConfirmAlertText': {
            display: 'flex',
            justifyContent: 'center',
            padding: '1rem'
        }
    })

    addUtilities({
        '.ConfirmAlertForm-mobile': {
            '@media (max-width: 768px)': {
                width: '35vh',
            },
        },
        '.AlertConfirmButton:hover': {
            backgroundColor: 'rgb(66, 75, 255)',
            transform: 'scale(1.05)',
            border: '0.1vh solid rgb(66, 0, 255)',
        },
    })
})