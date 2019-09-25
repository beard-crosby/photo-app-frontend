import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Profile from './pages/Profile'
import Notfound from './pages/NotFound'

const Router = () =>
  <Switch>
    <Route exact path="/" component={Profile}/>
    <Route component={Notfound}/>
  </Switch>

export default Router