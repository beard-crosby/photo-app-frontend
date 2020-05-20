import React from 'react'
import Button from '../components/UI/Button'

const loggedOut = ({ history }) => 
  <div className="model">
    <div className="top">
      <h5>LOGGED OUT</h5>
      <h5 onClick={() => history.goBack()}>BACK</h5>
    </div>
    <div className="middle">
      <p>You were logged out.</p>
      <Button text="Continue" redirect={"/auth"}/>
    </div>
  </div>

export default loggedOut