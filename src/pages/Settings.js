import React, { useContext } from 'react'
import { UserContext } from '../App'
import Button from '../components/UI/Button'
import { logout } from '../shared/localStorage'

const Settings = ({ history }) => {
  const { user, setUser } = useContext(UserContext)

  return (
    <>
      <Button text="Logout" onClick={() => setUser({ ...logout(), redirect: "/auth" })} darkMode={user.dark_mode}/>
      <Button text="Delete Account" onClick={() => history.push('/deleteuser')} darkMode={user.dark_mode} style={{ marginTop: 10 }}/>
    </>
  )
}

export default Settings