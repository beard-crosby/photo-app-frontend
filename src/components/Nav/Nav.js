import React, { useState, useContext } from 'react'
import { UserContext } from '../../App'
import { NavLink, Link } from 'react-router-dom'
import UploadBtn from '../UI/Button/UploadBtn'
import { Moon, Sun } from 'react-feather'
import Slider from '../UI/Slider'
import UploadModel from '../Model/UploadModel'

const Nav = () => {
  const { user, darkMode, setDarkMode } = useContext(UserContext)
  const [ displayModel, setDisplayModel ] = useState(false)

  return (
    <nav className="nav">
      <div className="nav-top">
        <Link to="/"><h1>PHOTO APP</h1></Link>
        <div className="nav-top-right">
        <Slider SvgFalse={<Moon/>} SvgTrue={<Sun/>} hideMobile style={{ marginRight: 25 }} onClick={() => setDarkMode(!darkMode)} darkMode={darkMode}/>
          <UploadBtn text="UPLOAD" onClick={() => setDisplayModel(true)}/>
          <UploadModel display={displayModel} onClick={() => setDisplayModel(false)}/>
          {user.token ? <Link to="/profile"><div className="profile-picture"/></Link> : <Link to="/auth"><h5 className="login">LOGIN</h5></Link>}
        </div>
      </div>
      <div className="nav-bottom">
        <div className="nav-bottom-left">
          <NavLink to="/"><p>Following</p></NavLink>
          <NavLink to="/profile"><p>Profile</p></NavLink>
          <NavLink to="/settings"><p>Settings</p></NavLink>
        </div>
        <Slider SvgFalse={<Moon/>} SvgTrue={<Sun/>} hideDesktop onClick={() => setDarkMode(!darkMode)} darkMode={darkMode}/>
      </div>
    </nav>
  )
}

export default Nav