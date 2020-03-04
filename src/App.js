import React, { useState } from 'react'
import './scss/base.scss'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Router from './Router'
import Spinner from './components/UI/Spinner'
import { checkLocalStorage } from './shared/localStorage'
import { switchDarkMode } from './shared/utility'

const UserContext = React.createContext()

const App = () => {
  const [ loading, setLoading ] = useState(false)
  const [ user, setUser ] = useState(checkLocalStorage())
  
  // If in develop mode, console log every time any state used in context is mutated. 
  process.env.NODE_ENV === 'development' && console.log({loading, user})

  // on load, update dark_mode class and localStorage.
  switchDarkMode(user)

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
