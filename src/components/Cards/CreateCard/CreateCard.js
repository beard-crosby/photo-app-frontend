import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import GoogleOAuth from '../../UI/Button/GoogleOAuth'
import Button from '../../UI/Button'
import { removeKey } from '../../../shared/utility'
import { createUser, login } from '../../../shared/authRequests'
import { checkFormValid } from '../../../shared/formValidation'
import FormSection from '../../UI/FormSection'
import { LogIn } from 'react-feather'
import PropTypes from 'prop-types'

const CreateCard = ({ user, setUser, setLoading, history, style }) => {
  const [ formValid, setFormValid ] = useState(false)
  const [ form, setForm ] = useState({
    values: {
      name: "",
      email: "",
      password: "",
      passConfirm: "",
    },
    errors: {
      nameError: "",
      emailError: "",
      passwordError: "",
      passConfirmError: "",
    },
  })

  useEffect(() => {
    checkFormValid(form, setFormValid)
    user.formErrors === "oAuth Login" && login(user.data, user, setUser, setLoading, history)
  }, [user, setUser, setLoading, history, form])

  useEffect(() => () => user.formErrors && setUser(removeKey(user, "formErrors")), [])

  const onSignUp = event => {
    event.preventDefault()
    createUser(form.values, user, setUser, setLoading, history)
  }
  
  return (
    <form className="model" onSubmit={event => onSignUp(event)} style={style}>
      <div className="top">
        <h5>CREATE AN ACCOUNT</h5>
      </div>
      <div className="middle">
        <FormSection text={"Name"} err={form.errors.nameError} user={user} form={form} setForm={setForm} maxLength="30"/>
        <FormSection text={"Email"} err={form.errors.emailError} user={user} form={form} setForm={setForm} setForm={setForm}/>
        <FormSection text={"Password"} err={form.errors.passwordError} user={user} form={form} setForm={setForm} minLength="8" maxLength="20"/>
        <FormSection text={"Password Check"} err={form.errors.passwordCheckError} user={user} form={form} setForm={setForm} minLength="8" maxLength="20"/>
        <Link to="/termsandconditions"><h6 className="terms-and-conditions">I agree to the <u><strong>Terms and Conditions</strong></u></h6></Link>
        <Button text="Sign Up" submit disabled={!formValid} icon={<LogIn/>}/>
        <GoogleOAuth text="Sign up with Google" user={user} setUser={setUser} setLoading={setLoading} history={history} create/>
      </div>
    </form>
  )
}

CreateCard.propTypes = {
  user: PropTypes.object,     // user object from context.
  setUser: PropTypes.func,    // setUser function from context.
  setLoading: PropTypes.func, // setLoading function from context.
  history: PropTypes.object,  // history object from react-router-dom.
  style: PropTypes.object,    // pass up style prop.
}

export default CreateCard