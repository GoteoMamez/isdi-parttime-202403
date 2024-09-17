// tailwind.config.js
const plugin = require('tailwindcss/plugin')

export default plugin(({ addComponents, theme, addBase }) => {
    addComponents({
        '.ConnecttooTitle': {
            //'@apply font-luxurious-script': {},
            color: 'white',
            fontSize: '2.4rem',
            fontFamily: 'luxurious-script',
        },
        '.UserNameHeading': {
            //'@apply font-langar': {},
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            padding: '2rem',
            fontFamily: 'langar'
        },
        '.CreatePostFormHeading': {
            // '@apply font-langar': {},
            fontFamily: 'langar',
            color: 'white',
        }
    })


    addBase({
        extend: {
            fontFamily: {
                'luxurious-script': ['"Luxurious Script"', 'cursive'],
                'langar': ['"Langar"', 'system-ui'],
            }
        }
    })
})