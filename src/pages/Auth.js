import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../App'
import Form from '../components/UI/Form'
import { Link } from 'react-router-dom'
import GoogleLogin from '../components/UI/Button/GoogleLogin'
import FacebookLogin from '../components/UI/Button/FacebookLogin'
import Button from '../components/UI/Button'
import { login } from '../shared/authRequests'
import { updateForm, checkFormValid } from '../shared/formValidation'

const Auth = ({ history }) => {
  const { setUser, setLoading } = useContext(UserContext)
  const [ formValid, setFormValid ] = useState(false)
  const [ form, setForm ] = useState({
    authForm: true,
    email: "",
    username: "",
    password: "",
  })

  useEffect(() => {
    checkFormValid(form, setFormValid)
  }, [form])

  const onLoginClicked = event => {
    event.preventDefault()
    login(form, history, setUser, setLoading) // request
  }
  console.log(form)
  return (
    <Form submit={event => onLoginClicked(event)}
      top={
        <>
          <h5>LOGIN</h5>
          <h5 className="back" onClick={() => history.goBack()}>BACK</h5>
        </>}
      bottom={
        <>
          <Link to="/create"><h5>CREATE AN ACCOUNT</h5></Link>
          <Link to="/forgot"><h5>FORGOT PASSWORD</h5></Link>
        </>
      }>
      <label htmlFor="username_or_email"><h5>Username or Email</h5></label>
      <input 
        type="text" 
        name="username_or_email" 
        id="username_or_email" 
        onChange={event => updateForm(event, form, setForm)}>
      </input>
      <label htmlFor="password"><h5>Password</h5></label>
      <input 
        type="password" 
        name="password" 
        id="password" 
        onChange={event => updateForm(event, form, setForm)}>
      </input>
      <div className="auth-buttons">
        <Button submit disabled={!formValid} loginSVG text="Login"/>
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