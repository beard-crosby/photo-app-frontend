import React, { useState } from 'react'
import './scss/base.scss'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Router from './Router'
import { withRouter } from 'react-router-dom'
import { localStore } from './shared/requests'

const UserContext = React.createContext()

const App = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [user, setUser] = useState(localStore().userData)
  
  // If in develop mode, console log every time any state used in context is mutated. 
  process.env.NODE_ENV === 'development' && console.log({isLoading, darkMode, user})

  // If darkMode = true, add 'dark-mode' class to body. Else remove it. 'dark-mode' scss class is in base.scss. 
  if (darkMode) {
    document.body.classList.add('dark-mode')
  } else {
    document.body.classList.remove('dark-mode')
  }

  return (
    <UserContext.Provider value={{ isLoading, setIsLoading, darkMode, setDarkMode, user, setUser }}>
      <Nav/>
      <main>
        <Router/>
      </main>
      <Footer/>
    </UserContext.Provider>
  )
}

export default withRouter(App)

export { UserContext }
