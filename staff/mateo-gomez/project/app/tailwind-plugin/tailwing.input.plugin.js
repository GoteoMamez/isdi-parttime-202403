
// tailwind.config.js
const plugin = require('tailwindcss/plugin')

export default plugin(({ addComponents }) => {
    addComponents({
        '.Input': {
            borderRadius: '15px',
            backgroundColor: 'hsl(0, 1%, 54%)',
            height: '2rem',
            margin: '0.5rem',
            color: 'rgb(37, 37, 37)',
            fontSize: 'medium',
            padding: '0.5rem',
        },
        '.Input::placeholder': {
            color: 'rgb(37, 37, 37)',
            fontSize: 'medium',
            padding: '0.5rem',
        },
    })
})