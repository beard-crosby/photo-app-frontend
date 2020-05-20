import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../App'
import { withRouter, Link } from 'react-router-dom'
import GoogleLogin from '../components/UI/Button/GoogleLogin'
import FacebookLogin from '../components/UI/Button/FacebookLogin'
import Button from '../components/UI/Button'
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

  useEffect(() => checkFormValid(form, setFormValid), [form])

  const onSignUp = event => {
    event.preventDefault()
    createUser(form.values, history, user, setUser, setLoading) // request
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
        <GoogleLogin
          text="Sign Up With Google"
          onSuccess={res => console.log(res)}
          onFail={res => console.log(res)}/>
        <FacebookLogin 
          text="Sign Up With Facebook"
          res={res => console.log(res)}/>
      </div>
    </form>
  )
}

export default withRouter(Create)