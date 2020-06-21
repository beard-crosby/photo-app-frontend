import React, { useState, useContext, useEffect } from 'react'
import { Context } from '../App'
import { removeKey } from '../shared/utility'
import { Link } from 'react-router-dom'
import GoogleOAuth from '../components/UI/Button/GoogleOAuth'
import Button from '../components/UI/Button'
import { login } from '../shared/authRequests'
import { checkFormValid } from '../shared/formValidation'
import FormSection from '../components/UI/FormSection'
import { LogIn } from 'react-feather'

const Auth = ({ history }) => {
  const { user, setUser, setLoading } = useContext(Context)
  const [ formValid, setFormValid ] = useState(false)
  const [ form, setForm ] = useState({
    values: {
      email: "",
      password: "",
    },
    errors: {
      emailError: "",
      passwordError: "",
    },
  })

  useEffect(() => {
    checkFormValid(form, setFormValid)
    return () => user.formErrors && setUser(removeKey(user, "formErrors"))
  }, [user, setUser, form])

  const onLoginClicked = event => {
    event.preventDefault()
    login(form.values, user, setUser, setLoading, history) // request
  }

  return (
    <>
      <form className="model" onSubmit={event => onLoginClicked(event)}>
        <div className="top">
          <h5>LOGIN</h5>
          <h5 onClick={() => history.goBack()}>BACK</h5>
        </div>
        <div className="middle">
          <FormSection text={"Email"} err={form.errors.emailError} user={user} form={form} setForm={setForm}/>
          <FormSection text={"Password"} user={user} form={form} setForm={setForm}/>
          <Button text="Login" submit disabled={!formValid} icon={<LogIn/>}/>
          <GoogleOAuth text="Login With Google" user={user} setUser={setUser} setLoading={setLoading} history={history}/>
        </div>
      </form>
      <Link className="below" to="/forgot"><h6>Forgot Password</h6></Link>
    </>
  )
}

export default Auth