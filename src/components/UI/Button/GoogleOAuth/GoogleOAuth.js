import React from 'react'
import styles from '../_button.module.scss'
import GoogleLogin from 'react-google-login'
import { createUser, login } from '../../../../shared/authRequests'
import PropTypes from 'prop-types'

const GoogleOAuth = ({ text, user, setUser, setLoading, history, create, style }) => {
  const onSuccess = res => {
    const data = { ...res.profileObj, token: res.tokenId }
    if (create) {
      createUser(data, user, setUser, setLoading, history) 
    } else {
      login(data, user, setUser, setLoading, history)
    }
  }

  const onFailure = res => {
    setUser({...user, formErrors: create ? "Sign up with Google failed. Please try another method." : "Login with Google failed. Please try again."})
    process.env.NODE_ENV === 'development' && console.log(res)
  }

  return (
    <GoogleLogin
    clientId="462401484786-9vmhfvsio66m87gtec0g1uqak8fll9m0.apps.googleusercontent.com"
    onSuccess={onSuccess}
    onFailure={onFailure}
    cookiePolicy={"single_host_origin"}
    render={renderProps => (
      <button 
        onClick={renderProps.onClick} 
        disabled={renderProps.disabled}
        className={styles.button}
        style={style}>
        <img alt="Google Logo" src={require('../../../../static/logo/google.png')}/>
        <h5>{text}</h5>
      </button>
    )}/>
  )
}

GoogleOAuth.propTypes = {
  text: PropTypes.string.isRequired,     // Text on the button.
  user: PropTypes.object.isRequired,     // user object from context.
  setUser: PropTypes.func.isRequired,    // setUser function from context.
  setLoading: PropTypes.func.isRequired, // setLoading function from context.
  history: PropTypes.object.isRequired,  // history object from react-router-dom.
  create: PropTypes.bool,                // create === true and createUser after GoogleLogin res. Else, login.
  style: PropTypes.object,               // Can change style on Component call.
}

export default GoogleOAuth