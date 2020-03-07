import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../App'
import { withRouter, Link } from 'react-router-dom'
import GoogleLogin from '../components/UI/Button/GoogleLogin'
import FacebookLogin from '../components/UI/Button/FacebookLogin'
import Button from '../components/UI/Button'
import { createUser } from '../shared/authRequests'
import { updateForm, checkFormValid } from '../shared/formValidation'
import PropTypes from 'prop-types'

const Create = ({ history, style, stackButtons, hideTopRight, hideBottom }) => {
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
    <form className="model" onSubmit={event => onSignUp(event)} style={style ? style : { width: 500 }}>
      <div className="top">
        <h5>CREATE AN ACCOUNT</h5>
        {!hideTopRight && <h5 className="pointer" onClick={() => history.goBack()}>BACK</h5>}
      </div>
      <div className="middle">
        <label htmlFor="name"><p>{formErrors.nameError ? formErrors.nameError : "Name"}</p></label>
        <input 
          type="text" 
          name="name" 
          id="name" 
          onChange={event => updateForm(event, form, setForm, formErrors, setFormErrors)}>
        </input>
        <label htmlFor="username"><p>{formErrors.usernameError ? formErrors.usernameError : "Username"}</p></label>
        <input 
          type="text" 
          name="username" 
          id="username" 
          onChange={event => updateForm(event, form, setForm, formErrors, setFormErrors)}>
        </input>
        <label htmlFor="email"><p>{formErrors.emailError ? formErrors.emailError : "Email"}</p></label>
        <input 
          type="email" 
          name="email" 
          id="email" 
          onChange={event => updateForm(event, form, setForm, formErrors, setFormErrors)}>
        </input>
        <label htmlFor="password"><p>{formErrors.passwordError ? formErrors.passwordError : "Password"}</p></label>
        <input 
          type="password" 
          name="password" 
          id="password" 
          onChange={event => updateForm(event, form, setForm, formErrors, setFormErrors)}>
        </input>
        <label htmlFor="passConfirm"><p>{formErrors.passConfirmError ? formErrors.passConfirmError : "Password Check"}</p></label>
        <input 
          type="password" 
          name="passConfirm" 
          id="passConfirm" 
          onChange={event => updateForm(event, form, setForm, formErrors, setFormErrors)}>
        </input>
        <div className={`buttons ${stackButtons && `stackButtons`}`}>
          <Button submit disabled={!formValid} loginSVG text="Sign Up"/>
          <GoogleLogin
            text="Login With Google"
            onSuccess={res => console.log(res)}
            onFail={res => console.log(res)}/>
          <FacebookLogin 
            text="Login With Facebook"
            res={res => console.log(res)}/>
        </div>
      </div>
      {!hideBottom && <div className="bottom">
        <Link to="/auth"><h5>BACK TO LOGIN</h5></Link>
      </div>}
    </form>
  )
}

Create.propTypes = {
  history: PropTypes.object, // react-router-dom function obtained with withRouter.
  style: PropTypes.object, // pass up style.
  stackButtons: PropTypes.bool, // True = Stack buttons in the buttons div vertically.
  hideTopRight: PropTypes.bool, // True = Hide the back button.
  hideBottom: PropTypes.bool, // True = Hide the "bottom" div.
}

export default withRouter(Create)