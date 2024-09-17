// tailwind.config.js
const plugin = require('tailwindcss/plugin')

export default plugin(({ addComponents }) => {
    addComponents({
        '.profileContainerUpdateForm': {
            display: 'grid',
            gap: '16px',
        },
        '@media (min-width: 768px)': {
            '.profileContainerUpdateForm': {
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            },
        },
        '@media (max-width: 767px)': {
            '.profileContainer': {
                gridTemplateColumns: 'repeat(2, 1fr)',
            },
        },
    })
})