import React, { useContext } from 'react'
import { UserContext } from '../App'
import '../scss/_settings.scss'
import Button from '../components/UI/Button'

const Settings = () => {
  const { darkMode } = useContext(UserContext)

  return (
    <div className="settings-wrapper">
      <Button text="Logout" darkMode={darkMode}/>
    </div>
  )
}

export default Settings