import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../App'
import { Link } from 'react-router-dom'
import Button from '../components/UI/Button'

const Forgot = ({ history }) => {
  const { forms, setForms } = useContext(UserContext)
  const [ formValid, setFormValid ] = useState(false)

  useEffect(() => forms.forgot.trim() === "" ? setFormValid(true) : setFormValid(false), [forms])
  const updateField = event => setForms({...forms, forgot: event.target.value})

  const onSubmit = event => {
    event.preventDefault()
    // backend request
  }

  return (
    <form className="model" onSubmit={event => onSubmit(event)} style={{ width: 500 }}>
      <div className="top">
        <h5>FORGOT PASSWORD</h5>
        <h5 className="pointer" onClick={() => history.goBack()}>BACK</h5>
      </div>
      <div className="middle">
        <label htmlFor="forgot"><h5>Email</h5></label>
        <input
          type="email" 
          name="forgot" 
          id="forgot" 
          onChange={updateField}>
        </input>
        <div className="buttons stackButtons">
          <Button submit disabled={formValid} loginSVG text="Submit"/>
        </div>
      </div>
      <div className="bottom">
        <Link to="/auth"><h5>LOG IN</h5></Link>
        <Link to="/create"><h5>CREATE AN ACCOUNT</h5></Link>
      </div>
    </form>
  )
}

export default Forgot