import { useState } from 'react'

import logic from './logic/index'

import './App.css'
import Register from './components/view/Register'
import Login from './components/view/Login'

function App() {
  console.log('App -> render')

  const [view, setView] = useState(logic.isUserLoggedIn() ? 'Home' : 'Login')

  const handleGoToRegister = () => setView('Register')
  const handleGoToLogin = () => setView('Login')
  const handleGoToHome = () => setView('Home')

  return <>
    <h1>Hello, App!</h1>
    {view === 'Register' && <Register onUserRegistered={handleGoToLogin} onLoginClick={handleGoToLogin}></Register>}
    {view === 'Login' && <Login onUserLoggedIn={handleGoToHome} onRegisterLinkClick={handleGoToRegister} />}


    {
      view === 'Home' && <Home onUserLoggedOut={handleGoToLogin} />
    }

  </>
}

export default App
