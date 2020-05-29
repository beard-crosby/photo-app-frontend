import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../App'
import { Link } from 'react-router-dom'
import GoogleLogin from '../components/UI/Button/GoogleLogin'
import FacebookLogin from '../components/UI/Button/FacebookLogin'
import Button from '../components/UI/Button'
import { login } from '../shared/authRequests'
import { checkFormValid } from '../shared/formValidation'
import FormSection from '../components/UI/FormSection'
import { LogIn } from 'react-feather'

const Auth = ({ history }) => {
  const { user, setUser, setLoading } = useContext(UserContext)
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

  useEffect(() => checkFormValid(form, setFormValid), [form])

  const onLoginClicked = event => {
    event.preventDefault()
    login(form.values, history, user, setUser, setLoading) // request
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
          <GoogleLogin
            text="Login With Google"
            onSuccess={res => console.log(res)}
            onFail={res => console.log(res)}/>
          <FacebookLogin 
            text="Login With Facebook"
            res={res => console.log(res)}/>
        </div>
      </form>
      <Link className="below" to="/forgot"><h6>Forgot Password</h6></Link>
    </>
  )
}

export default Auth