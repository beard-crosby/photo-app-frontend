import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/UI/Button'

const Forgot = ({ history }) => {
  const [ formValid, setFormValid ] = useState(false)
  const [ form, setForm ] = useState({
    email: "",
  })

  useEffect(() => form.email.trim() === "" ? setFormValid(true) : setFormValid(false), [form])
  const updateField = event => setForm({...form, [event.target.name]: event.target.value})

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
        <label htmlFor="email"><h5>Email</h5></label>
        <input
          style={{ margin: 0 }}
          type="email" 
          name="email" 
          id="email" 
          onChange={updateField}>
        </input>
        <div className="buttons stackButtons">
          <Button submit disabled={formValid} loginSVG text="Submit"/>
        </div>
      </div>
      <div className="bottom" style={{ margin: 0 }}>
        <Link to="/auth"><h5>LOG IN</h5></Link>
        <Link to="/create"><h5>CREATE AN ACCOUNT</h5></Link>
      </div>
    </form>
  )
}

export default Forgot