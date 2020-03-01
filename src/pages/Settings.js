import React, { useState, useContext } from 'react'
import { UserContext } from '../App'
import Button from '../components/UI/Button'
import { logout } from '../shared/localStorage'
import { Redirect } from 'react-router-dom'

const Settings = () => {
  const { setUser, darkMode } = useContext(UserContext)
  const [ redirect, setRedirect ] = useState(false)
  
  if (redirect) {
    return <Redirect to="/"/>
  }

  const logoutClickedHandler = () => {
    setRedirect(true)
    setUser(logout())
  }

  return (
    <Button text="Logout" onClick={() => logoutClickedHandler()} darkMode={darkMode}/>
  )
}

export default Settings