import React, { useContext } from 'react'
import { UserContext } from '../App'
import Button from '../components/UI/Button'
import { logout, deleteAccount } from '../shared/requests'

const Settings = ({ history }) => {
  const { user, setUser, darkMode } = useContext(UserContext)

  return (
    <>
      <Button text="Logout" onClick={() => setUser(logout(history))} darkMode={darkMode}/>
      <Button text="Delete Account" onClick={() => deleteAccount(user._id, history, setUser)} darkMode={darkMode} style={{ marginTop: 10 }}/>
    </>
  )
}

export default Settings