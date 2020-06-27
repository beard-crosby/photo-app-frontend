import React, { useContext } from 'react'
import { Context } from '../App'
import { updateStatus } from '../shared/miscRequests'
import Button from '../components/UI/Button'
import { logout } from '../shared/localStorage'
import ProfileCard from '../components/Cards/ProfileCard'
import { LogOut, XSquare, GitHub } from 'react-feather'
import Toggle from '../components/UI/Toggle/Toggle'
import SettingsCard from '../components/Cards/SettingsCard/SettingsCard'
import { updateSettingsHandler } from '../shared/utility'

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
              <Toggle text="Dark Mode" Default={user.settings.dark_mode} onClick={() => updateSettingsHandler(user, setUser, "dark_mode", history)}/>
              <Toggle text="Overlay" Default={user.settings.overlay} onClick={() => updateSettingsHandler(user, setUser, "overlay", history)}/>
            </div>
          </div>
          <div className="model" style={{ width: 340, marginBottom: 20 }}>
            <div className="top">
              <h5 className="title-left">WALL</h5>
            </div>
            <div className="middle">
              <Toggle text="Own posts" Default={user.settings.own_posts} onClick={() => updateSettingsHandler(user, setUser, "own_posts", history)}/>
              <Toggle text="Random posts" Default={user.settings.random_posts}/>
              <Toggle text="Collage style" Default={user.settings.collage_style}/>
            </div>
          </div>
          <div className="model" style={{ width: 340, marginBottom: 20 }}>
            <div className="top">
              <h5 className="title-left">POSTS</h5>
            </div>
            <div className="middle">
              <Toggle text="Always disable comments" Default={user.settings.post_comments}/>
              <Toggle text="Always watermark" Default={user.settings.post_watermark}/>
            </div>
          </div>
        </div>
        <div className="flex-col" style={{ alignItems: "flex-end" }}>
          <SettingsCard user={user} setUser={setUser} history={history}/>
          <div className="model" style={{ width: 340 }}>
            <div className="top">
              <h5 className="title-left">PRIVACY</h5>
            </div>
            <div className="middle">
              <Toggle text="Location services" Default={user.settings.location_services}/>
              <Toggle text="Online status" Default={user.settings.online_status}/>
              <Toggle text="Make profile private" Default={user.settings.private_profile}/>
              <Toggle text="Make posts private" Default={user.settings.private_posts}/>
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