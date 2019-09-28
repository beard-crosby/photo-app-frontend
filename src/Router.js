import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Notfound from './pages/NotFound'
import Profile from './pages/Profile'
import Wall from './pages/Wall'

const Router = () =>
  <Switch>
    <Route exact path="/" component={Wall}/>
    <Route path="/profile" component={Profile}/>
    <Route component={Notfound}/>
  </Switch>

export default Router