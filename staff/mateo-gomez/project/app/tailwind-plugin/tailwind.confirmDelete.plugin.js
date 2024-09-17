// tailwind.config.js
const plugin = require('tailwindcss/plugin')

export default plugin(({ addComponents, addUtilities }) => {
    addComponents({
        '.ConfirmDeleteForm': {
            zIndex: '1000',
            position: 'fixed',
            top: '20vh',
            width: '50vh',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'white',
            borderRadius: '2rem',
            left: '50%',
            transform: 'translate(-50%)',
        },
        '.ConfirmDeleteOverlay': {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            zIndex: '1000',
        },
        '.DeleteConfirmButton': {
            backgroundColor: 'rgba(148, 3, 3, 0.672)',
            transitionProperty: 'background-color, transform',
            transitionDuration: '0.3s',
        },
        '.DeleteButtons': {
            display: 'flex',
        },
    })

    addUtilities({
        '.ConfirmDeleteForm-mobile': {
            '@media (max-width: 768px)': {
                width: '35vh',
            },
        },
        '.DeleteConfirmButton:hover': {
            backgroundColor: 'rgb(206, 37, 37)',
            transform: 'scale(1.05)',
            border: '0.1vh solid rgb(143, 23, 23)',
        },
    })
})