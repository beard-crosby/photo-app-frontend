import React, { useContext } from 'react'
import { UserContext } from '../App'
import Button from '../components/UI/Button'
import { logout } from '../shared/localStorage'

const Settings = ({ history }) => {
  const { setUser, darkMode } = useContext(UserContext)

  const logoutClickedHandler = () => {
    setUser(logout())
    history.push("/")
  }

  return (
    <Button text="Logout" onClick={() => logoutClickedHandler()} darkMode={darkMode}/>
  )
}

export default Settings