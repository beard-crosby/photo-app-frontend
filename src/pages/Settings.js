import React, { useContext } from 'react'
import { Context } from '../App'
import { updateStatus } from '../shared/miscRequests'
import Button from '../components/UI/Button'
import { logout } from '../shared/localStorage'
import ProfileCard from '../components/Cards/ProfileCard'
import { LogOut, XSquare, GitHub } from 'react-feather'
import Toggle from '../components/UI/Toggle/Toggle'
import { switchDarkMode } from '../shared/utility'

const Settings = ({ history }) => {
  const { user, setUser } = useContext(Context)

  const logoutHandler = () => {
    updateStatus(user, "offline")
    setUser(logout())
    history.push("/auth")
  }

  return (
    <div className="flex-col">
      <div className="flex-row">
        <ProfileCard user={user}/>
      </div>
      <div className="flex-row" style={{ flexGrow: 1, alignItems: "flex-start" }}>
        <div className="flex-col" style={{ alignItems: "flex-start" }}>
          <div className="model" style={{ width: 340, marginBottom: 20 }}>
            <div className="top">
              <h5 className="title-left">GENERAL</h5>
            </div>
            <div className="middle">
              <Toggle text="Dark Mode" Default={user.settings.dark_mode} onClick={() => switchDarkMode(user, setUser, false, history)}/>
              <Toggle text="Disable Overlay" Default={false}/>
            </div>
          </div>
          <div className="model" style={{ width: 340, marginBottom: 20 }}>
            <div className="top">
              <h5 className="title-left">WALL</h5>
            </div>
            <div className="middle">
              <Toggle text="Exclude own posts" Default={false}/>
              <Toggle text="Exclude random posts" Default={false}/>
              <Toggle text="Collage style default" Default={false}/>
            </div>
          </div>
          <div className="model" style={{ width: 340, marginBottom: 20 }}>
            <div className="top">
              <h5 className="title-left">POSTS</h5>
            </div>
            <div className="middle">
              <Toggle text="Always disable comments" Default={false}/>
              <Toggle text="Always watermark" Default={false}/>
            </div>
          </div>
        </div>
        <div className="flex-col" style={{ alignItems: "flex-end" }}>
          <div className="model" style={{ width: 340, marginBottom: 20 }}>
            <div className="top">
              <h5 className="title-left">PROFILE</h5>
            </div>
            <div className="middle">
              <Button text="Change Profile Picture" redirect={"/changepp"}/>
              <Button text="Change Name"/>
              <Button text="Change Email"/>
              <Button text="Change Website"/>
              <Toggle text="Display Email" Default={false}/>
              <Toggle text="Display Website" Default={false}/>
              <Toggle text="Display Contact Me" Default={false}/>
            </div>
          </div>
          <div className="model" style={{ width: 340 }}>
            <div className="top">
              <h5 className="title-left">PRIVACY</h5>
            </div>
            <div className="middle">
              <Toggle text="Disable location services" Default={false}/>
              <Toggle text="Disable online status" Default={false}/>
              <Toggle text="Make posts private" Default={false}/>
              <Toggle text="Make profile private" Default={false}/>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-row" style={{ width: 250, marginBottom: 10 }}>
        <Button text="Logout" icon={<LogOut/>} onClick={() => logoutHandler()}/>
        <Button text="Delete Account" icon={<XSquare/>} redirect={"/deleteuser"}/>
      </div>
      <a href="https://github.com/beard-crosby/photo-app-frontend"><Button text="Photo App is an open source project!" icon={<GitHub/>}/></a>
    </div>
  )
}

export default Settings