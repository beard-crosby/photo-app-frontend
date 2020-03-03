import React, { useState } from 'react'
import './scss/base.scss'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Router from './Router'
import Spinner from './components/UI/Spinner'
import { checkLocalStorage } from './shared/localStorage'

const UserContext = React.createContext()

const App = () => {
  const [ loading, setLoading ] = useState(false)
  const [ user, setUser ] = useState(checkLocalStorage())
  
  // If in develop mode, console log every time any state used in context is mutated. 
  process.env.NODE_ENV === 'development' && console.log({loading, user})

  // If user.dark_mode = true, add 'dark-mode' class to body. Else remove it. 'dark-mode' scss class is in base.scss. 
  if (user.dark_mode) {
    document.body.classList.add('dark-mode')
  } else {
    document.body.classList.remove('dark-mode')
  }

  return (
    <UserContext.Provider value={{ loading, setLoading, user, setUser }}>
      <Nav/>
      <main>
        {loading ? <Spinner/> : <Router/>}
      </main>
      <Footer/>
    </UserContext.Provider>
  )
}

export default App

export { UserContext }
