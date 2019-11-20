import React, { useState } from 'react'
import Form from '../components/UI/Form'
import { Link } from 'react-router-dom'
import GoogleLogin from '../components/UI/Button/AuthButton/GoogleLogin'
import FacebookLogin from '../components/UI/Button/AuthButton/FacebookLogin'
import SubmitBtn from '../components/UI/Button/AuthButton/SubmitBtn'

const Auth = () => {
  const [form, setForm] = useState({
    email: null,
    username: null,
    password: null,
  })

  const updateField = e => {
    setForm({
        ...form,
        [e.target.name]: e.target.value,
    })
  }

  const onSignUp = event => {
    event.preventDefault()
    // backend request
  }

  return (
    <Form submit={event => onSignUp(event)}
      top={
        <>
          <h5>CREATE AN ACCOUNT</h5>
          <Link to="/"><h5>BACK</h5></Link>
        </>}
      bottom={<Link to="/auth"><h5>BACK TO SIGN IN</h5></Link>}>
      <label htmlFor="email"><h5>Email</h5></label>
      <input 
        type="email" 
        name="email" 
        id="email" 
        onChange={updateField}>
      </input>
      <label htmlFor="username"><h5>Username</h5></label>
      <input 
        type="text" 
        name="username" 
        id="username" 
        onChange={updateField}>
      </input>
      <label htmlFor="password"><h5>Password</h5></label>
      <input 
        type="password" 
        name="password" 
        id="password" 
        onChange={updateField}>
      </input>
      <label htmlFor="password"><h5>Password Check</h5></label>
      <input 
        type="password" 
        name="password" 
        id="password" 
        onChange={updateField}>
      </input>
      <div className="auth-buttons">
        <SubmitBtn text="Sign Up"/>
        <GoogleLogin
          text="Sign Up With Google"
          onSuccess={res => console.log(res)}
          onFail={res => console.log(res)}/>
        <FacebookLogin 
          text="Sign Up With Facebook"
          res={res => console.log(res)}/>
      </div>
    </Form>
  )
}

export default Auth