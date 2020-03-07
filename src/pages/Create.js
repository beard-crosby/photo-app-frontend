import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../App'
import Form from '../components/UI/Form'
import { withRouter, Link } from 'react-router-dom'
import GoogleLogin from '../components/UI/Button/GoogleLogin'
import FacebookLogin from '../components/UI/Button/FacebookLogin'
import Button from '../components/UI/Button'
import { createUser } from '../shared/authRequests'
import { updateForm, checkFormValid } from '../shared/formValidation'

const Create = ({ history, style, btnStyle, topRight, hideBottom, className }) => {
  const { setUser, setLoading } = useContext(UserContext)
  const [ formValid, setFormValid ] = useState(false)
  const [ form, setForm ] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    passConfirm: "",
  })
  const [ formErrors, setFormErrors ] = useState({
    nameError: false,
    usernameError: false,
    emailError: false,
    passwordError: false,
    passConfirmError: false,
  })

  useEffect(() => {
    checkFormValid(form, setFormValid, formErrors)
  }, [form, formErrors])

  const onSignUp = event => {
    event.preventDefault()
    createUser(form, history, setUser, setLoading) // request
  }

  return (
    <Form className={className} submit={event => onSignUp(event)}
      style={style}
      top={
        <>
          <h5>CREATE AN ACCOUNT</h5>
          {topRight ? topRight : <h5 className="back" onClick={() => history.goBack()}>BACK</h5>}
        </>}
      hideBottom={hideBottom}  
      bottom={<Link to="/auth"><h5>BACK TO LOGIN</h5></Link>}>
      <label htmlFor="name"><h5>{formErrors.nameError ? formErrors.nameError : "Name"}</h5></label>
      <input 
        type="text" 
        name="name" 
        id="name" 
        onChange={event => updateForm(event, form, setForm, formErrors, setFormErrors)}>
      </input>
      <label htmlFor="username"><h5>{formErrors.usernameError ? formErrors.usernameError : "Username"}</h5></label>
      <input 
        type="text" 
        name="username" 
        id="username" 
        onChange={event => updateForm(event, form, setForm, formErrors, setFormErrors)}>
      </input>
      <label htmlFor="email"><h5>{formErrors.emailError ? formErrors.emailError : "Email"}</h5></label>
      <input 
        type="email" 
        name="email" 
        id="email" 
        onChange={event => updateForm(event, form, setForm, formErrors, setFormErrors)}>
      </input>
      <label htmlFor="password"><h5>{formErrors.passwordError ? formErrors.passwordError : "Password"}</h5></label>
      <input 
        type="password" 
        name="password" 
        id="password" 
        onChange={event => updateForm(event, form, setForm, formErrors, setFormErrors)}>
      </input>
      <label htmlFor="passConfirm"><h5>{formErrors.passConfirmError ? formErrors.passConfirmError : "Password Check"}</h5></label>
      <input 
        type="password" 
        name="passConfirm" 
        id="passConfirm" 
        onChange={event => updateForm(event, form, setForm, formErrors, setFormErrors)}>
      </input>
      <div className="auth-buttons" style={btnStyle}>
        <Button submit disabled={!formValid} loginSVG text="Sign Up"/>
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

export default withRouter(Create)