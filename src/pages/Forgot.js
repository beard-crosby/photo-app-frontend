import React, { useState, useEffect } from 'react'
import Form from '../components/UI/Form'
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
    <Form submit={event => onSubmit(event)}
      top={
        <>
          <h5>FORGOT PASSWORD</h5>
          <h5 className="back" onClick={() => history.goBack()}>BACK</h5>
        </>}
      bottom={
        <>
          <Link to="/auth"><h5>LOG IN</h5></Link>
          <Link to="/create"><h5>CREATE AN ACCOUNT</h5></Link>
        </>
      }>
      <label htmlFor="email"><h5>Email</h5></label>
      <input 
        type="email" 
        name="email" 
        id="email" 
        onChange={updateField}>
      </input>
      <div className="auth-buttons">
        <Button submit disabled={formValid} loginSVG text="Submit"/>
      </div>
    </Form>
  )
}

export default Forgot