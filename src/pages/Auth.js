import React, { useState, useContext } from 'react'
import { UserContext } from '../App'
import Form from '../components/UI/Form'
import { Link, Redirect } from 'react-router-dom'
import GoogleLogin from '../components/UI/Button/AuthButton/GoogleLogin'
import FacebookLogin from '../components/UI/Button/AuthButton/FacebookLogin'
import SubmitBtn from '../components/UI/Button/AuthButton/SubmitBtn'
import { logInSuccess } from '../shared/localStorage'
import axios from 'axios'

const Auth = ({ history }) => {
  const { setUser } = useContext(UserContext)
  const [ redirect, setRedirect ] = useState(false)
  const [ form, setForm ] = useState({
    email: null,
    username: null,
    password: null,
  })

  if (redirect) {
    return <Redirect to="/"/>
  }

  // Identify if the data in username_or_email input field is an email or a username.
  const updateField = e => {
    if (e.target.name === 'username_or_email') {
      if (e.target.value.includes('@')) {
        setForm({
          ...form,
          email: e.target.value,
          username: null,
        })
        return
      } else {
        setForm({
          ...form,
          email: null,
          username: e.target.value,
        })
        return
      }
    }
    setForm({
        ...form,
        [e.target.name]: e.target.value,
    })
  }

  const onSignIn = event => {
    event.preventDefault()
    axios.post('', {
      variables: {
        email: form.email,
        password: form.password,
      },
      query: `
        query Login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            _id
            token
            tokenExpiry
            name
            username
            email
            bio
            profileImg
            posts {
              _id
              img
              title
              description
              comments {
                _id
                comment
                author {
                  _id
                }
              }
            }
            following {
              _id
              name
              username
              email
              bio
              profileImg
              posts {
                _id
                img
                title
                description
                comments {
                  _id
                  comment
                  author {
                    _id
                  }
                }
              }
            }
          }
        }
      `
    }).then(res => {
      if (res.data.errors) {
        console.log(res.data.errors[0].message)
      } else {
        setRedirect(true)
        logInSuccess(res.data.data.login)
        setUser(res.data.data.login)
      }
    }).catch(err => console.log(err))
  }

  return (
    <Form submit={event => onSignIn(event)}
      top={
        <>
          <h5>LOGIN</h5>
          <h5 className="back" onClick={() => history.goBack()}>BACK</h5>
        </>}
      bottom={
        <>
          <Link to="/create"><h5>CREATE AN ACCOUNT</h5></Link>
          <Link to="/forgot"><h5>FORGOT PASSWORD</h5></Link>
        </>
      }>
      <label htmlFor="username_or_email"><h5>Username or Email</h5></label>
      <input 
        type="text" 
        name="username_or_email" 
        id="username_or_email" 
        onChange={updateField}>
      </input>
      <label htmlFor="password"><h5>Password</h5></label>
      <input 
        type="password" 
        name="password" 
        id="password" 
        onChange={updateField}>
      </input>
      <div className="auth-buttons">
        <SubmitBtn login text="Login"/>
        <GoogleLogin
          text="Login With Google"
          onSuccess={res => console.log(res)}
          onFail={res => console.log(res)}/>
        <FacebookLogin 
          text="Login With Facebook"
          res={res => console.log(res)}/>
      </div>
    </Form>
  )
}

export default Auth