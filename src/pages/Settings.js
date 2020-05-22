import React, { useContext } from 'react'
import { UserContext } from '../App'
import Button from '../components/UI/Button'
import { logout } from '../shared/localStorage'
import ProfileCard from '../components/Cards/ProfileCard'
import { LogOut, XSquare, GitHub } from 'react-feather'

const Settings = () => {
  const { user, setUser } = useContext(UserContext)

  return (
    <div className="flex-col">
      <div className="flex-row">
        <ProfileCard user={user}/>
      </div>
      <div className="flex-row model">
        <div className="top">
          <h5 className="title-left">GENERAL</h5>
        </div>
        <div className="middle-row">
          <Button text="Change Profile Picture" redirect={"/changepp"}/>
          <Button text="Change Name"/>
          <Button text="Change Email"/>
          <Button text="Change Website"/>
        </div>
      </div>
      <div className="flex-row model">
        <div className="top">
          <h5 className="title-left">PROFILE</h5>
        </div>
        <div className="middle-row">
          <Button text="Toggle Display Email"/>
          <Button text="Toggle Display Website"/>
          <Button text="Toggle Display Biography"/>
        </div>
      </div>
      <div className="flex-row" style={{ width: 250 }}>
        <Button text="Logout" icon={<LogOut/>} onClick={() => setUser({ ...logout(), redirect: "/auth" })}/>
        <Button text="Delete Account" icon={<XSquare/>} redirect={"/deleteuser"}/>
      </div>
      <a href="https://github.com/beard-crosby/photo-app-frontend"><Button text="Photo App is an open source project!" icon={<GitHub/>}/></a>
    </div>
  )
}

export default Settings