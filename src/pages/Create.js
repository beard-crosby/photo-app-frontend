import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../App'
import { withRouter, Link } from 'react-router-dom'
import GoogleLogin from '../components/UI/Button/GoogleLogin'
import FacebookLogin from '../components/UI/Button/FacebookLogin'
import Button from '../components/UI/Button'
import { createUser } from '../shared/authRequests'
import { updateForm, checkFormValid } from '../shared/formValidation'
import { backendError } from '../shared/utility'
import PropTypes from 'prop-types'

const Create = ({ history, style, stackButtons, hideTopRight, hideBottom }) => {
  const { user, setUser, setLoading } = useContext(UserContext)
  const [ formValid, setFormValid ] = useState(false)
  const [ form, setForm ] = useState({
    values: {
      name: "",
      username: "",
      email: "",
      password: "",
      passConfirm: "",
    },
    errors: {
      nameError: false,
      usernameError: false,
      emailError: false,
      passwordError: false,
      passConfirmError: false,
    }
  })

  useEffect(() => checkFormValid(form, setFormValid), [form])

  const onSignUp = event => {
    event.preventDefault()
    createUser(form.values, history, user, setUser, setLoading) // request
  }
  
  return (
    <form className="model" onSubmit={event => onSignUp(event)} style={style ? style : { width: 500 }}>
      <div className="top">
        <h5>CREATE AN ACCOUNT</h5>
        {!hideTopRight && <h5 className="pointer" onClick={() => history.goBack()}>BACK</h5>}
      </div>
      <div className="middle">
        <label htmlFor="name"><p>{form.errors.nameError ? form.errors.nameError : "Name"}</p></label>
        <input 
          type="text" 
          name="name" 
          id="name" 
          onChange={event => updateForm(event, form, setForm)}>
        </input>
        <label htmlFor="username"><p>{form.errors.usernameError ? form.errors.usernameError : backendError(user, "Username")}</p></label>
        <input 
          type="text" 
          name="username" 
          id="username" 
          onChange={event => updateForm(event, form, setForm)}>
        </input>
        <label htmlFor="email"><p>{form.errors.emailError ? form.errors.emailError : backendError(user, "Email")}</p></label>
        <input 
          type="email" 
          name="email" 
          id="email" 
          onChange={event => updateForm(event, form, setForm)}>
        </input>
        <label htmlFor="password"><p>{form.errors.passwordError ? form.errors.passwordError : backendError(user, "Password")}</p></label>
        <input 
          type="password" 
          name="password" 
          id="password" 
          onChange={event => updateForm(event, form, setForm)}>
        </input>
        <label htmlFor="passConfirm"><p>{form.errors.passConfirmError ? form.errors.passConfirmError : "Password Check"}</p></label>
        <input 
          type="password" 
          name="passConfirm" 
          id="passConfirm" 
          onChange={event => updateForm(event, form, setForm)}>
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