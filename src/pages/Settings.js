import React, { useContext } from 'react'
import { UserContext } from '../App'
import Button from '../components/UI/Button'
import { logout } from '../shared/localStorage'
import { deleteAccount } from '../shared/authRequests'

const Settings = ({ history }) => {
  const { user, setUser, darkMode, setLoading } = useContext(UserContext)

  return (
    <>
      <Button text="Logout" onClick={() => setUser(logout(history))} darkMode={darkMode}/>
      <Button text="Delete Account" onClick={() => deleteAccount(user._id, history, setUser, setLoading)} darkMode={darkMode} style={{ marginTop: 10 }}/>
    </>
  )
}

export default Settings