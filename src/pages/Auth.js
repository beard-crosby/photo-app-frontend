import React, { useState } from 'react'
import Form from '../components/UI/Form'
import { Link } from 'react-router-dom'
import GoogleLogin from '../components/UI/Button/AuthButton/GoogleLogin'
import FacebookLogin from '../components/UI/Button/AuthButton/FacebookLogin'
import LoginBtn from '../components/UI/Button/AuthButton/LoginBtn'

const Auth = () => {
  const [form, setForm] = useState({
    email: null,
    username: null,
    password: null,
  })
  
  const updateField = e => {
    if (e.target.name === 'username_or_email') {
      if (e.target.value.includes('@')) {
        setForm({
          ...form,
          email: e.target.value,
          username: null,
        })
        return
      } else {
        setForm({
          ...form,
          username: e.target.value,
        })
        return
      }
    }
    setForm({
        ...form,
        [e.target.name]: e.target.value,
    })
  }

  const onSignIn = event => {
    event.preventDefault()
    // backend request
  }

  return (
    <Form submit={event => onSignIn(event)}
      top={
        <>
          <h5>LOGIN</h5>
          <Link to="/"><h5>BACK</h5></Link>
        </>}
      bottom={
        <>
          <Link to="/create"><h5>CREATE AN ACCOUNT</h5></Link>
          <Link to="/forgot"><h5>FORGOT PASSWORD</h5></Link>
        </>
      }>
      <label htmlFor="username_or_email"><h5>Username or Email</h5></label>
      <input type="text" name="username_or_email" id="username_or_email" onChange={updateField}></input>
      <label htmlFor="password"><h5>Password</h5></label>
      <input type="password" name="password" id="password" onChange={updateField}></input>
      <div className="auth-buttons">
        <LoginBtn text="Login"/>
        <GoogleLogin
          text="Login With Google"
          onSuccess={res => console.log(res)}
          onFail={res => console.log(res)}/>
        <FacebookLogin 
          text="Login With Facebook"
          res={res => console.log(res)}/>
      </div>
    </Form>
  )
}

export default Auth