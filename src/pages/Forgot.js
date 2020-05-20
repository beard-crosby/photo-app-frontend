import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../App'
import Button from '../components/UI/Button'
import '../components/UI/FormSection'
import { checkFormValid } from '../shared/formValidation'
import FormSection from '../components/UI/FormSection'
import { Mail } from 'react-feather'

const Forgot = ({ history }) => {
  const { user } =  useContext(UserContext)
  const [ formValid, setFormValid ] = useState(false)
  const [ form, setForm ] = useState({
    values: {
      email: "",
    },
    errors: {
      emailError: "",
    },
  })

  useEffect(() => checkFormValid(form, setFormValid), [form])

  const onSubmit = event => {
    event.preventDefault()
    // backend request
  }

  return (
    <form className="model" onSubmit={event => onSubmit(event)}>
      <div className="top">
        <h5 className="title">FORGOT PASSWORD</h5>
        <h5 onClick={() => history.goBack()}>BACK</h5>
      </div>
      <div className="middle">
        <FormSection text={"Email"} err={form.errors.emailError} user={user} form={form} setForm={setForm}/>
        <Button text="Submit" submit disabled={!formValid} icon={<Mail/>}/>
      </div>
    </form>
  )
}

export default Forgot