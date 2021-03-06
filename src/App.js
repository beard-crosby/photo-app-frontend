import React, { useState, useEffect } from 'react'
import './scss/base.scss'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Router from './Router'
import Spinner from './components/Spinner'
import { checkLocalStorage } from './shared/localStorage'
import Overlay from './components/Overlay'

const Context = React.createContext()

const App = () => {
  const [ loading, setLoading ] = useState(false)
  const [ user, setUser ] = useState(checkLocalStorage())
  const [ wall, setWall ] = useState(localStorage.getItem('wall') ? JSON.parse(localStorage.getItem('wall')) : [])
  
  useEffect(() => {
    !user.token && setWall([])
  }, [user])
  
  // If in develop mode, console log every time any state used in context is mutated. 
  process.env.NODE_ENV === 'development' && console.log({loading, wall, user})

  return (
    <Context.Provider value={{ loading, setLoading, wall, setWall, user, setUser }}>
      <Nav user={user} setUser={setUser}/>
      {user.settings.overlay && <Overlay user={user}/>}
      <main>
        {loading && <Spinner user={user}/>}
        <Router/>
      </main>
      <Footer/>
    </Context.Provider>
  )
}

export default App

export { Context }