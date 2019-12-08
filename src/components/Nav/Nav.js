import React, { useState, useContext } from 'react'
import { UserContext } from '../../App'
import { NavLink, Link } from 'react-router-dom'
import UploadBtn from '../UI/Button/UploadBtn'
import { Moon, Sun } from 'react-feather'
import UploadModel from '../Model/UploadModel'
import { withRouter } from 'react-router-dom'

const Nav = () => {
  const { user, darkMode, setDarkMode } = useContext(UserContext)
  const [ displayModel, setDisplayModel ] = useState(false)

  return (
    <nav>
      <div className="nav-top">
        <Link to="/"><h1>PHOTO APP</h1></Link>
        <div className="nav-top-right">
          {user.token && darkMode ? <Sun onClick={() => setDarkMode(!darkMode)}/> : <Moon onClick={() => setDarkMode(!darkMode)}/>}
          {user.token && <UploadBtn text="UPLOAD" onClick={() => setDisplayModel(true)}/>}
          <UploadModel display={displayModel} onClick={() => setDisplayModel(false)}/>
          {user.token ? <Link to="/profile"><div className="profile-picture"/></Link> : <Link to="/auth"><h5 className="login">LOGIN</h5></Link>}
        </div>
      </div>
      {user.token &&
        <div className="nav-bottom">
          <div className="nav-bottom-left">
            <NavLink to="/"><p>Following</p></NavLink>
            <NavLink to="/profile"><p>Profile</p></NavLink>
            <NavLink to="/settings"><p>Settings</p></NavLink>
          </div>
        </div>}
    </nav>
  )
}

export default withRouter(Nav)