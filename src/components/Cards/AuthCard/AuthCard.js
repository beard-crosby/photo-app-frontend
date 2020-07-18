import React, { useState, useEffect } from 'react'
import { removeKey } from '../../../shared/utility'
import GoogleOAuth from '../../UI/Button/GoogleOAuth'
import Button from '../../UI/Button'
import { login } from '../../../shared/authRequests'
import { checkFormValid } from '../../../shared/formValidation'
import FormSection from '../../UI/FormSection'
import { LogIn } from 'react-feather'
import PropTypes from 'prop-types'

const AuthCard = ({ user, setUser, setLoading, formErrors, history, style }) => {
  const [ formValid, setFormValid ] = useState(false)
  const [ form, setForm ] = useState({
    email: "",
    password: "",
  })

  useEffect(() => {
    checkFormValid(user, form, formErrors, setFormValid)
    return () => user.formErrors && setUser(removeKey(user, "formErrors"))
  }, [user, setUser, form, formErrors])

  const onLoginClicked = event => {
    event.preventDefault()
    login(form, user, setUser, setLoading, history)
  }

  return (
    <>
      <form className="model" onSubmit={event => onLoginClicked(event)} style={style}>
        <div className="top">
          <h5>LOGIN</h5>
          <h5 onClick={() => history.goBack()}>BACK</h5>
        </div>
        <div className="middle">
          <FormSection label={"Email"} form={form} setForm={setForm}/>
          <FormSection label={"Password"} form={form} setForm={setForm} forgot/>
          <Button text="Login" submit disabled={!formValid} icon={<LogIn/>}/>
          <GoogleOAuth text="Login With Google" user={user} setUser={setUser} setLoading={setLoading} history={history}/>
        </div>
      </form>
    </>
  )
}

AuthCard.propTypes = {
  user: PropTypes.object.isRequired,        // user object from context.
  setUser: PropTypes.func.isRequired,       // setUser function from context.
  setLoading: PropTypes.func.isRequired,    // setLoading function from context.
  formErrors: PropTypes.string.isRequired,  // setForm function on which this component is called for.
  history: PropTypes.object,                // history object from react-router-dom.
  style: PropTypes.object,                  // pass up style.
}

export default AuthCard