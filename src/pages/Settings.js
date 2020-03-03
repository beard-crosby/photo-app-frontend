import React, { useState, useContext } from 'react'
import { UserContext } from '../App'
import Button from '../components/UI/Button'
import SubmitBtn from '../components/UI/Button/AuthButton/SubmitBtn'
import { logout } from '../shared/localStorage'
import { deleteAccount } from '../shared/authRequests'
import Model from '../components/Model'

const Settings = ({ history }) => {
  const { user, setUser, setLoading } = useContext(UserContext)
  const [ model, setModel ] = useState(false)

  return (
    <>
      <Button text="Logout" onClick={() => setUser(logout(history))} darkMode={user.dark_mode}/>
      <Button text="Delete Account" onClick={() => setModel(true)} darkMode={user.dark_mode} style={{ marginTop: 10 }}/>
      <Model display={model} onClick={() => setModel(false)} 
        title="Are you sure?" 
        style={{ textAlign: 'center' }}
        bottomStyle={{ justifyContent: 'center' }}
        bottom={(
          <SubmitBtn 
            text="DELETE ACCOUNT" 
            style={{ marginTop: 15 }} 
            onClick={() => deleteAccount(user._id, history, setUser, setLoading, user.token)}
          />
        )}>
        <p>You are about to permanently delete your account!</p>
      </Model>
    </>
  )
}

export default Settings