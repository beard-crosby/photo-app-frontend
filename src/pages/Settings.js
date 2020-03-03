import React, { useContext } from 'react'
import { UserContext } from '../App'
import Button from '../components/UI/Button'
import { logout } from '../shared/localStorage'
import { deleteAccount } from '../shared/authRequests'

const Settings = ({ history }) => {
  const { user, setUser, setLoading } = useContext(UserContext)

  return (
    <>
      <Button text="Logout" onClick={() => setUser(logout(history))} darkMode={user.dark_mode}/>
      <Button text="Delete Account" onClick={() => deleteAccount(user._id, history, setUser, setLoading, user.token)} darkMode={user.dark_mode} style={{ marginTop: 10 }}/>
    </>
  )
}

export default Settings