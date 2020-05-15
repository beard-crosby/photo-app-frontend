import React, { useContext } from 'react'
import { UserContext } from '../App'
import Button from '../components/UI/Button'
import { logout } from '../shared/localStorage'
import ProfileInfo from '../components/ProfileInfo'

const Settings = ({ history }) => {
  const { user, setUser } = useContext(UserContext)

  return (
    <div className="flex-col">
      <div className="flex-row">
        <ProfileInfo user={user}/>
      </div>
      <div className="model settings">
        <div className="top">
          <h5>GENERAL</h5>
        </div>
        <div className="middle">
          <div className="middle-row">
            <Button text="Change Profile Picture" onClick={() => history.push("/changepp")}/>
            <Button text="Change Name"/>
            <Button text="Change Email"/>
            <Button text="Change Website"/>
          </div>
        </div>
      </div>
      <div className="model settings">
        <div className="top">
          <h5>PROFILE</h5>
        </div>
        <div className="middle">
          <div className="middle-row">
            <Button text="Toggle Display Email"/>
            <Button text="Toggle Display Website"/>
            <Button text="Toggle Display Biography"/>
          </div>
        </div>
      </div>
      <div className="flex-row">
        <Button text="Logout" onClick={() => setUser({ ...logout(), redirect: "/auth" })}/>
        <Button text="Delete Account" onClick={() => history.push('/deleteuser')}/>
      </div>
    </div>
  )
}

export default Settings