import React, { useState, useContext, useEffect } from 'react'
import { Context } from '../App'
import { removeKey } from '../shared/utility'
import Button from '../components/UI/Button'
import '../components/UI/FormSection'
import { checkFormValid } from '../shared/formValidation'
import FormSection from '../components/UI/FormSection'
import { Mail } from 'react-feather'
import MasonryWrapper from '../components/Masonry/MasonryWrapper'
import { posts } from '../shared/postRequests'

const Forgot = ({ history }) => {
  const { user, setUser } =  useContext(Context)
  const [ formValid, setFormValid ] = useState(false)
  const [ form, setForm ] = useState({
    values: {
      email: "",
    },
    errors: {
      emailError: "",
    },
  })

  useEffect(() => {
    checkFormValid(form, setFormValid)
    return () => user.formErrors && setUser(removeKey(user, "formErrors"))
  }, [user, setUser, form])

  useEffect(() => posts(user, setUser, 20, 4), []) // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = event => {
    event.preventDefault()
    // backend request
  }

  return (
    <MasonryWrapper user={user}>
      <form className="model" onSubmit={event => onSubmit(event)} style={{ width: 343, marginBottom: 7 }}>
        <div className="top">
          <h5 className="title">FORGOT PASSWORD</h5>
          <h5 onClick={() => history.goBack()}>BACK</h5>
        </div>
        <div className="middle">
          <FormSection text={"Email"} err={form.errors.emailError} user={user} form={form} setForm={setForm}/>
          <Button text="Submit" submit disabled={!formValid} icon={<Mail/>}/>
        </div>
      </form>
    </MasonryWrapper>
  )
}

export default Forgot