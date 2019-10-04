import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Notfound from './pages/NotFound'
import Profile from './pages/Profile'
import Following from './pages/Following'
import Settings from './pages/Settings'

const Router = () =>
  <Switch>
    <Route exact path="/" component={Following}/>
    <Route path="/profile" component={Profile}/>
    <Route path="/settings" component={Settings}/>
    <Route component={Notfound}/>
  </Switch>

export default Router