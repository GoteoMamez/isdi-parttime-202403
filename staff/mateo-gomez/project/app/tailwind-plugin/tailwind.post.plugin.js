// tailwind.config.js
const plugin = require('tailwindcss/plugin')

export default plugin(({ addComponents }) => {
    addComponents({
        '.Post': {
            position: 'relative',
            width: '40vh',
            height: 'auto',
            backgroundColor: 'aliceblue',
            margin: '0.8rem',
            borderRadius: '4%',
            top: '3vh',
            fontFamily: '"Langar", system-ui',
        },
        '.PostImage': {
            width: '95%',
            height: '20vh',
            objectFit: 'cover',
            margin: '0 auto',
            display: 'block',

        },
        '.AuthorTitle': {
            fontSize: '4vh',
            display: 'flex',
            marginLeft: '4vh',
            marginTop: '0',
            marginBottom: '0',
        },
        '.CityAgePost': {
            display: 'flex',
            justifyContent: 'space-between',
            padding: '2vh 4vh',
            paddingRight: '9vh',
        },
        '.PostDescription': {
            display: 'flex',
            padding: '0 4vh',
            flexDirection: 'column',
            alignItems: 'flex-start',
            margin: '1vh 0',
        },
        '.PostOffer': {
            display: 'flex',
            padding: '0 4vh',
            marginTop: '-1.5vh',
        },
        '.FromLocationPost': {
            display: 'flex',
            padding: '0 4vh',
            paddingRight: '9vh',
            marginBottom: '0.7vh',
            marginTop: '0.7vh',
        },
        '.ToLocationPost': {
            display: 'flex',
            padding: '0 4vh',
            paddingRight: '9vh',
            marginBottom: '0.7vh',
            marginTop: '0.7vh',
        },
        '.PostDate': {
            display: 'flex',
            padding: '0 4vh',
            paddingRight: '9vh',
            marginBottom: '0.7vh',
            marginTop: '0.7vh',
        },
        '.DeletePostButton': {
            margin: '0.5vh',
            marginLeft: '26vh',
            width: '10vh',
        },
    })
})