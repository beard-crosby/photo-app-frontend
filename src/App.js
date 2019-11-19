import React, { useState } from 'react'
import './scss/base.scss'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Router from './Router'

const UserContext = React.createContext()

const App = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [user, setUser] = useState({
    id: null,
    token: null,
    refreshToken: null,
    name: null,
    username: null,
    email: null,
    uploads: {
      photographs: [],
      videos: []
    }
  })

  console.log({isLoading, darkMode, user})

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

export default App

export { UserContext }
