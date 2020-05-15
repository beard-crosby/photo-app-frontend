import React, { useContext } from 'react'
import { UserContext } from './App'
import { Route, Switch } from 'react-router-dom'

import Notfound from './pages/NotFound'
import Profile from './pages/Profile'
import Discover from './pages/Discover'
import Wall from './pages/Wall'
import Settings from './pages/Settings'
import Auth from './pages/Auth'
import Create from './pages/Create'
import Forgot from './pages/Forgot'
import Splash from './pages/Splash'
import Post from './pages/Post'
import DeleteUser from './pages/DeleteUser'
import ChangePP from './pages/ChangePP'
import LoggedOut from './pages/LoggedOut'

const Router = () => {
  const { user } = useContext(UserContext)

  return (
    <Switch>
      {user.token ?
        <>
          <Route exact path="/" component={Wall}/>
          <Route path="/profile" component={Profile}/>
          <Route path="/discover" component={Discover}/>
          <Route path="/settings" component={Settings}/>
          <Route path="/post" component={Post}/>
          <Route path="/deleteuser" component={DeleteUser}/>
          <Route path="/changepp" component={ChangePP}/> 
        </> :
        <>
          <Route exact path="/" component={Splash}/>
          <Route path="/auth" component={Auth}/>
          <Route path="/create" component={Create}/>
          <Route path="/forgot" component={Forgot}/>
          <Route path="/loggedout" component={LoggedOut}/>
        </>
      }
      <Route component={Notfound}/>
    </Switch>
  )
}

export default Router