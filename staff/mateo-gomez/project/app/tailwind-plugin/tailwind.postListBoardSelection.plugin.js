// tailwind.config.js
const plugin = require('tailwindcss/plugin')

export default plugin(({ addComponents }) => {
    addComponents({
        '.PostListBoardSelection': {
            display: 'flex',
            position: 'fixed',
            justifyContent: 'center',
            marginTop: '10vh',
            top: '0',
            width: '100%',
            background: 'black',
            zIndex: '100000',
            paddingTop: '1vh',
            paddingBottom: '2vh',
            height: '5vh',
        },
        '.HostBoardButton, .GuestBoardButton': {
            display: 'flex',
            justifyContent: 'space-around',
            margin: '0',
            width: '15vh',
            height: '2.5rem'
        },
        '.HostBoardButton': {
            borderTopLeftRadius: '20px',
            borderBottomLeftRadius: '20px',
            borderBottomRightRadius: '0px',
            borderTopRightRadius: '0px',
            background: 'rgb(22, 116, 146)',
            color: 'white',
        },
        '.HostBoardButton:hover': {
            backgroundColor: 'rgb(8, 65, 84)',
            border: '0.1vh solid rgb(9, 82, 106)',
            color: 'white',
        },
        '.GuestBoardButton': {
            borderTopLeftRadius: '0px',
            borderBottomLeftRadius: '0px',
            borderBottomRightRadius: '20px',
            borderTopRightRadius: '20px',
            background: 'rgb(72, 144, 186)',
            color: 'white',
        },
        '.GuestBoardButton:hover': {
            backgroundColor: 'rgb(35, 105, 145)',
            border: '0.1vh solid rgb(40, 120, 166)',
            color: 'white',
        },
    })
})