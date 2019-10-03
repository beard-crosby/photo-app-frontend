import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Notfound from './pages/NotFound'
import Profile from './pages/Profile'
import Following from './pages/Following'

const Router = () =>
  <Switch>
    <Route exact path="/" component={Following}/>
    <Route path="/profile" component={Profile}/>
    <Route component={Notfound}/>
  </Switch>

export default Router