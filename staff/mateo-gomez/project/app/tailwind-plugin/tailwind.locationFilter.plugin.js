// tailwind.config.js
const plugin = require('tailwindcss/plugin')

export default plugin(({ addComponents, theme }) => {
    addComponents({
        '.CityFilter': {
            zIndex: '10000',
            color: theme('colors.white'),
            position: 'relative',
            marginLeft: '70%',
            marginTop: '16vh',
            fontFamily: '"Langar", system-ui',
            display: 'inline-block',
            cursor: 'pointer',
        },
        '.LocationsList': {
            position: 'absolute',
            top: '100%',
            right: '0',
            maxHeight: '200px',
            overflowY: 'auto',
            backgroundColor: 'rgba(0, 0, 0, 0.381)',
            border: '1px solid #dddddd34',
            borderRadius: '4px',
            boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
            zIndex: '1000',
            listStyleType: 'none',
            paddingLeft: '0',
            margin: '0',
            cursor: 'pointer',
        },
        '.LocationsList li': {
            padding: '0px',
            cursor: 'pointer',
            textAlign: 'left',
        },
        '.CityFilter .LocationsList li': {
            padding: '4px !important',
            margin: '2px 0 !important',
        },
        '.LocationButton': {
            padding: '0',
            margin: '0',
        },
        '.All': {
            backgroundColor: 'black',
            color: theme('colors.white'),
        },
        // Responsive styles for LocationsList
        '@media (max-width: 600px)': {
            '.LocationsList': {
                maxWidth: '95vw',
            },
        },
    })
})