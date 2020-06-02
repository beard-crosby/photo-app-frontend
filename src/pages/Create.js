import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../App'
import { withRouter, Link } from 'react-router-dom'
import GoogleOAuth from '../components/UI/Button/GoogleOAuth'
import Button from '../components/UI/Button'
import { removeKey } from '../shared/utility'
import { createUser } from '../shared/authRequests'
import { checkFormValid } from '../shared/formValidation'
import FormSection from '../components/UI/FormSection'
import { LogIn } from 'react-feather'

const Create = ({ history }) => {
  const { user, setUser, setLoading } = useContext(UserContext)
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
    return () => user.formErrors && setUser(removeKey(user, "formErrors"))
  }, [user, setUser, form])

  const onSignUp = event => {
    event.preventDefault()
    createUser(form.values, user, setUser, setLoading, history) // request
  }
  
  return (
    <form className="model" onSubmit={event => onSignUp(event)}>
      <div className="top">
        <h5>CREATE AN ACCOUNT</h5>
      </div>
      <div className="middle">
        <FormSection text={"Name"} err={form.errors.nameError} user={user} form={form} setForm={setForm}/>
        <FormSection text={"Email"} err={form.errors.emailError} user={user} form={form} setForm={setForm}/>
        <FormSection text={"Password"} err={form.errors.passwordError} user={user} form={form} setForm={setForm}/>
        <FormSection text={"Password Check"} err={form.errors.passConfirmError} user={user} form={form} setForm={setForm}/>
        <Link to="/termsandconditions"><h6 className="terms-and-conditions">I agree to the <u><strong>Terms and Conditions</strong></u></h6></Link>
        <Button text="Sign Up" submit disabled={!formValid} icon={<LogIn/>}/>
        <GoogleOAuth text="Sign up with Google" user={user} setUser={setUser} setLoading={setLoading} history={history} create/>
      </div>
    </form>
  )
}

export default withRouter(Create)