import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Home from './components/view/Home'
import Login from './components/view/Login'
import Register from './components/view/Register'
import logic from './logic/index'
import UserProfile from './components/view/components/UserProfile'
import { useNavigate, Link } from 'react-router-dom'
import Header from './components/view/components/Header'
import Heading from '../components/core/Heading'
import Button from '../components/core/Button'
import Footer from './components/view/components/Footer'

import Alert from './components/view/components/Alert'



function App() {
  console.log('App -> render')

  const [view, setView] = useState(logic.isUserLoggedIn() ? 'Home' : 'Login')
  const [name, setName] = useState('')
  const [homeView, setHomeView] = useState('HostPostList')
  const navigate = useNavigate()

  const [message, setMessage] = useState(null)

  const handleGoToRegister = () => navigate('/register')
  const handleGoToLogin = () => { setView('Login'); navigate('/') }
  const handleGoToHome = () => { setView('Home'); setHomeView('HostPostList'); navigate('/') }




  const handleLogout = () => {
    logic.logoutUser()

    handleGoToLogin()
    navigate('/')
  }

  const handleViewProfile = (userId) => {

    navigate(`/users/${userId}/profile`)
  }

  const handleCreatePostClick = () => {


    setHomeView('postTypeSelection')
    navigate('/')
  }


  const handleAlertAccepted = () => setMessage(null)

  const handleMessage = message => setMessage(message)


  return (
    <>
      {logic.isUserLoggedIn() && <Header>
        <Heading className='ConnecttooTitle' level='2'><Link to='/' className='ConnecttooButton'>Connecttoo</Link></Heading>
        <div className="HeaderRight" >
          <Heading className='UserNameHeading' level='3'>{name}</Heading>
          <Button className='Button LogoutButton' onClick={handleLogout}>Logout</Button>


        </div>

      </Header>}
      <Routes>
        <Route path="/" element={view === 'Login' ? <Login onUserLoggedIn={handleGoToHome} onRegisterLinkClick={handleGoToRegister} /> : <Home setName={setName} view={homeView} setView={setHomeView} onMessage={handleMessage} />} />
        <Route path="/register" element={<Register onUserRegistered={handleGoToLogin} onLoginClick={handleGoToLogin} />} />

        <Route path="/users/:userId/profile" element={<UserProfile />} />




      </Routes>

      {logic.isUserLoggedIn() && <Footer
        onCreatePostClick={handleCreatePostClick} className='Footer'
        onViewProfileClick={() => handleViewProfile(logic.getUserId())}
      ></Footer>}

      {message && <Alert message={message} onAccepted={handleAlertAccepted}></Alert>}
    </>
  )
}

export default App