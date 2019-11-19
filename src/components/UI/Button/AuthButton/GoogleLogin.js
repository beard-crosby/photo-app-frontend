import React from 'react'
import GoogleLogin from 'react-google-login'
import PropTypes from 'prop-types'

const GoogleBtn = ({ text, onSuccess, onFail, style }) => 
  <GoogleLogin
    clientId={process.env.REACT_APP_GOOGLE_AUTH_ID}
    buttonText={text}
    onSuccess={onSuccess}
    onFailure={onFail}
    style={style}
    cookiePolicy={'single_host_origin'}/>

GoogleLogin.propTypes = {
  onSuccess: PropTypes.func,
  onFail: PropTypes.func,
  text: PropTypes.string,
  style: PropTypes.func
}

export default GoogleBtn