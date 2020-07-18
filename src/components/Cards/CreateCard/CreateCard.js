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

const CreateCard = ({ user, setUser, setLoading, formErrors, setFormErrors, history, style }) => {
  const [ formValid, setFormValid ] = useState(false)
  const [ form, setForm ] = useState({
    name: "",
    email: "",
    password: "",
    passConfirm: "",
  })

  useEffect(() => {
    checkFormValid(user, form, formErrors, setFormValid)
    user.formErrors === "oAuth Login" && login(user.data, user, setUser, setLoading, history)
  }, [user, setUser, setLoading, history, form, formErrors])

  useEffect(() => () => user.formErrors && setUser(removeKey(user, "formErrors")), []) // eslint-disable-line react-hooks/exhaustive-deps

  const onSignUp = event => {
    event.preventDefault()
    createUser(form, user, setUser, setLoading, history)
  }

  return (
    <form className="model" onSubmit={event => onSignUp(event)} style={style}>
      <div className="top">
        <h5>CREATE AN ACCOUNT</h5>
      </div>
      <div className="middle">
        <FormSection label={"Name"} form={form} setForm={setForm} setFormErrors={setFormErrors} maxLength="30"/>
        <FormSection label={"Email"} form={form} setForm={setForm} setFormErrors={setFormErrors}/>
        <FormSection label={"Password"} form={form} setForm={setForm} setFormErrors={setFormErrors} minLength="8" maxLength="20"/>
        <FormSection label={"Password Check"} form={form} setForm={setForm} setFormErrors={setFormErrors} minLength="8" maxLength="20"/>
        <Link to="/termsandconditions"><h6 className="terms-and-conditions">I agree to the <u><strong>Terms and Conditions</strong></u></h6></Link>
        <Button text="Sign Up" submit disabled={!formValid} icon={<LogIn/>}/>
        <GoogleOAuth text="Sign up with Google" user={user} setUser={setUser} setLoading={setLoading} history={history} create/>
      </div>
    </form>
  )
}

CreateCard.propTypes = {
  user: PropTypes.object.isRequired,        // user object from context.
  setUser: PropTypes.func.isRequired,       // setUser function from context.
  setLoading: PropTypes.func.isRequired,    // setLoading function from context.
  formErrors: PropTypes.string.isRequired,  // setForm function on which this component is called for.
  setFormErrors: PropTypes.func.isRequired, // setFormErrors on which page this component is called for.
  history: PropTypes.object,                // history object from react-router-dom.
  style: PropTypes.object,                  // pass up style prop.
}

export default CreateCard