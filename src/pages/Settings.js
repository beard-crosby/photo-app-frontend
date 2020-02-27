import React, { useContext } from 'react'
import { UserContext } from '../App'
import Button from '../components/UI/Button'
import { logOut } from '../shared/requests'

const Settings = () => {
  const { darkMode } = useContext(UserContext)

  return (
    <Button text="Logout" onClick={() => logOut()} darkMode={darkMode}/>
  )
}

export default Settings