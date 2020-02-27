import React, { useState } from 'react'
import Form from '../components/UI/Form'
import { Link } from 'react-router-dom'
import GoogleLogin from '../components/UI/Button/AuthButton/GoogleLogin'
import FacebookLogin from '../components/UI/Button/AuthButton/FacebookLogin'
import SubmitBtn from '../components/UI/Button/AuthButton/SubmitBtn'
import { signUp } from '../shared/requests'

const Create = ({ history, style, btnStyle, topRight, hideBottom, className }) => {
  const [form, setForm] = useState({
    name: null,
    username: null,
    email: null,
    password: null,
    passConfirm: null,
  })
  console.log(form)
  const updateField = e => {
    setForm({
        ...form,
        [e.target.name]: e.target.value,
    })
  }

  const onSignUp = event => {
    event.preventDefault()
    signUp(form)
  }

  return (
    <Form className={className} submit={event => onSignUp(event)}
      style={style}
      top={
        <>
          <h5>CREATE AN ACCOUNT</h5>
          {topRight ? topRight : <h5 className="back" onClick={() => history.goBack()}>BACK</h5>}
        </>}
      hideBottom={hideBottom}  
      bottom={<Link to="/auth"><h5>BACK TO LOGIN</h5></Link>}>
      <label htmlFor="name"><h5>Name</h5></label>
      <input 
        type="text" 
        name="name" 
        id="name" 
        onChange={updateField}>
      </input>
      <label htmlFor="username"><h5>Username</h5></label>
      <input 
        type="text" 
        name="username" 
        id="username" 
        onChange={updateField}>
      </input>
      <label htmlFor="email"><h5>Email</h5></label>
      <input 
        type="email" 
        name="email" 
        id="email" 
        onChange={updateField}>
      </input>
      <label htmlFor="password"><h5>Password</h5></label>
      <input 
        type="password" 
        name="password" 
        id="password" 
        onChange={updateField}>
      </input>
      <label htmlFor="passConfirm"><h5>Password Check</h5></label>
      <input 
        type="password" 
        name="passConfirm" 
        id="passConfirm" 
        onChange={updateField}>
      </input>
      <div className="auth-buttons" style={btnStyle}>
        <SubmitBtn login text="Sign Up"/>
        <GoogleLogin
          text="Sign Up With Google"
          onSuccess={res => console.log(res)}
          onFail={res => console.log(res)}/>
        <FacebookLogin 
          text="Sign Up With Facebook"
          res={res => console.log(res)}/>
      </div>
    </Form>
  )
}

export default Create