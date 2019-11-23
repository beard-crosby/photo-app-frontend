import React, { useContext } from 'react'
import { UserContext } from '../App'
import Button from '../components/UI/Button'

const Settings = () => {
  const { darkMode } = useContext(UserContext)

  return (
    <Button text="Logout" darkMode={darkMode}/>
  )
}

export default Settings