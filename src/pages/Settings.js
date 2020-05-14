import React, { useContext } from 'react'
import { UserContext } from '../App'
import Button from '../components/UI/Button'
import { logout } from '../shared/localStorage'
import ProfilePicture from '../components/UI/ProfilePicture'

const Settings = ({ history }) => {
  const { user, setUser } = useContext(UserContext)

  return (
    <>
      <div className="model" style={{ width: 500 }}>
        <div className="top">
          <h5>SETTINGS</h5>
        </div>
        <div className="middle">
          <div className="middle-row">
            <ProfilePicture user={user} heightWidth={100}/>
          </div>
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