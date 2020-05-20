import React from 'react'
import Button from '../components/UI/Button'
import { LogIn } from 'react-feather'

const loggedOut = () => 
  <div className="model">
    <div className="top">
      <h5>LOGGED OUT</h5>
    </div>
    <div className="middle">
      <p>You were logged out.</p>
      <Button text="Continue" icon={<LogIn/>} redirect={"/auth"}/>
    </div>
  </div>

export default loggedOut