import React from 'react'
import Button from '../components/UI/Button'

const loggedOut = ({ history }) => 
  <div className="model">
    <div className="top">
      <h5>LOGGED OUT</h5>
      <h5 className="pointer" onClick={() => history.goBack()}>BACK</h5>
    </div>
    <div className="middle" style={{ alignItems: 'center' }}>
      <p>You were logged out.</p>
    </div>
    <div className="bottom" style={{ justifyContent: 'center' }}>
      <Button 
        text="Continue" 
        onClick={() => history.push("/auth")}/>
    </div>
  </div>

export default loggedOut