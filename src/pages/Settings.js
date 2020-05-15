import React, { useContext } from 'react'
import { UserContext } from '../App'
import Button from '../components/UI/Button'
import { logout } from '../shared/localStorage'
import ProfileInfo from '../components/ProfileInfo'

const Settings = ({ history }) => {
  const { user, setUser } = useContext(UserContext)

  return (
    <>
      <div className="model" style={{ width: 500 }}>
        <div className="top">
          <h5>SETTINGS</h5>
        </div>
        <div className="middle">
          <ProfileInfo user={user}/>
        </div>
        <div className="bottom">
          <Button text="Logout" onClick={() => setUser({ ...logout(), redirect: "/auth" })}/>
          <Button text="Delete Account" onClick={() => history.push('/deleteuser')}/>
        </div>
      </div>
    </>
  )
}

export default Settings