import React, { useContext } from 'react'
import { UserContext } from '../../App'
import { NavLink, Link } from 'react-router-dom'
import { Moon, Sun, Upload } from 'react-feather'
import { withRouter } from 'react-router-dom'
import { changeDarkMode } from '../../shared/miscRequests'

const Nav = history => {
  const { user, setUser } = useContext(UserContext)

  const darkModeClickedHandler = () => {
    setUser({...user, dark_mode: !user.dark_mode}) // set State
    user.token && changeDarkMode(user._id, user.token, history) // request
  }

  return (
    <nav>
      <div className="nav-top">
        <Link to="/"><h1>PHOTO APP</h1></Link>
        <div className="nav-top-right">
          {user.dark_mode ? <Sun onClick={() => darkModeClickedHandler()}/> : <Moon onClick={() => darkModeClickedHandler()}/>}
          {user.token ? <Link to="/post"><Upload/></Link> : <Link to="/auth"><p>LOGIN</p></Link>}
          {user.token && <Link to="/profile"><div className="profile-picture"/></Link>}
        </div>
      </div>
      {user.token &&
        <div className="nav-bottom">
          <div className="nav-bottom-left">
            <NavLink to="/"><p>Wall</p></NavLink>
            <NavLink to="/discover"><p>Discover</p></NavLink>
            <NavLink to="/profile"><p>Profile</p></NavLink>
            <NavLink to="/settings"><p>Settings</p></NavLink>
          </div>
        </div>}
    </nav>
  )
}

export default withRouter(Nav)