import React, { useState, useContext, useEffect } from 'react'
import { Context } from '../App'
import { withRouter, Link } from 'react-router-dom'
import GoogleOAuth from '../components/UI/Button/GoogleOAuth'
import Button from '../components/UI/Button'
import { removeKey } from '../shared/utility'
import { createUser, login } from '../shared/authRequests'
import { checkFormValid } from '../shared/formValidation'
import FormSection from '../components/UI/FormSection'
import { LogIn } from 'react-feather'

const Create = ({ history }) => {
  const { user, setUser, setLoading } = useContext(Context)
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
    if (user.formErrors === "oAuth Login") {
      login(user.data, user, setUser, setLoading, history)
    } else {
      return () => user.formErrors && setUser(removeKey(user, "formErrors"))
    }
  }, [user, setUser, setLoading, history, form])

  const onSignUp = event => {
    event.preventDefault()
    createUser(form.values, user, setUser, setLoading, history)
  }
  
  return (
    <form className="model" onSubmit={event => onSignUp(event)} style={{ marginBottom: 20 }}>
      <div className="top">
        <h5>CREATE AN ACCOUNT</h5>
      </div>
      <div className="middle">
        <FormSection text={"Name"} err={form.errors.nameError} user={user} form={form} setForm={setForm} maxLength="30"/>
        <FormSection text={"Email"} err={form.errors.emailError} user={user} form={form} setForm={setForm}/>
        <FormSection text={"Password"} err={form.errors.passwordError} user={user} form={form} setForm={setForm} minLength="8" maxLength="20"/>
        <FormSection text={"Password Check"} err={form.errors.passConfirmError} user={user} form={form} setForm={setForm} minLength="8" maxLength="20"/>
        <Link to="/termsandconditions"><h6 className="terms-and-conditions">I agree to the <u><strong>Terms and Conditions</strong></u></h6></Link>
        <Button text="Sign Up" submit disabled={!formValid} icon={<LogIn/>}/>
        <GoogleOAuth text="Sign up with Google" user={user} setUser={setUser} setLoading={setLoading} history={history} create/>
      </div>
    </form>
  )
}

export default withRouter(Create)