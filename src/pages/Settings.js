import React, { useContext } from 'react'
import { UserContext } from '../App'
import Button from '../components/UI/Button'
import { logout } from '../shared/localStorage'
import ProfileCard from '../components/ProfileCard'

const Settings = ({ history }) => {
  const { user, setUser } = useContext(UserContext)

  return (
    <div className="flex-col">
      <div className="flex-row">
        <ProfileCard user={user}/>
      </div>
      <div className="model section">
        <div className="top">
          <h5 className="title-left">GENERAL</h5>
        </div>
        <div className="middle-row">
          <Button text="Change Profile Picture" onClick={() => history.push("/changepp")}/>
          <Button text="Change Name"/>
          <Button text="Change Email"/>
          <Button text="Change Website"/>
        </div>
      </div>
      <div className="model section">
        <div className="top">
          <h5 className="title-left">PROFILE</h5>
        </div>
        <div className="middle-row">
          <Button text="Toggle Display Email"/>
          <Button text="Toggle Display Website"/>
          <Button text="Toggle Display Biography"/>
        </div>
      </div>
      <div className="button-row">
        <Button text="Logout" onClick={() => setUser({ ...logout(), redirect: "/auth" })}/>
        <Button text="Delete Account" onClick={() => history.push('/deleteuser')}/>
      </div>
    </div>
  )
}

export default Settings