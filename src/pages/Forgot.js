import React, { useState } from 'react'
import Form from '../components/UI/Form'
import { Link } from 'react-router-dom'
import SubmitBtn from '../components/UI/Button/SubmitBtn'

const Auth = ({ history }) => {
  const [form, setForm] = useState({
    email: null,
  })

  const updateField = e => {
    setForm({
        ...form,
        [e.target.name]: e.target.value,
    })
  }

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
      <label htmlFor="password"><h5>Password</h5></label>
      <input 
        type="password" 
        name="password" 
        id="password" 
        onChange={updateField}>
      </input>
      <div className="auth-buttons">
        <SubmitBtn login text="Submit"/>
      </div>
    </Form>
  )
}

export default Auth