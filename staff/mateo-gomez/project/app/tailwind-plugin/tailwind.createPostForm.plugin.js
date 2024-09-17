// tailwind.config.js
const plugin = require('tailwindcss/plugin')

export default plugin(({ addComponents }) => {
    addComponents({
        '.CreatePostFormHeading': {
            color: 'white',
            fontFamily: '"Langar", system-ui',
        },
        '.CreateCancelButtons': {
            display: 'flex',
            justifyContent: 'center',
        },
        '.CreatePostForm': {
            backgroundColor: 'black',
            display: 'flex',
            marginTop: '15vh',
            marginBottom: '17vh',
        },
    })
})