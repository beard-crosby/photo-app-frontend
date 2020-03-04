import React, { useContext } from 'react'
import { UserContext } from './App'
import { Route, Switch } from 'react-router-dom'

import Notfound from './pages/NotFound'
import Profile from './pages/Profile'
import Following from './pages/Following'
import Settings from './pages/Settings'
import Auth from './pages/Auth'
import Create from './pages/Create'
import Forgot from './pages/Forgot'
import Splash from './pages/Splash'
import Upload from './pages/Upload'
import DeleteUser from './pages/DeleteUser'

const Router = () => {
  const { user } = useContext(UserContext)

  return (
    <Switch>
      {user.token ? 
        <Route exact path="/" component={Following}/> : 
        <Route exact path="/" component={Splash}/>}
      <Route path="/profile" component={Profile}/>
      <Route path="/settings" component={Settings}/>
      <Route path="/upload" component={Upload}/>
      <Route path="/deleteuser" component={DeleteUser}/>
      <Route path="/auth" component={Auth}/>
      <Route path="/create" component={Create}/>
      <Route path="/forgot" component={Forgot}/>
      <Route component={Notfound}/>
    </Switch>
  )
}

export default Router