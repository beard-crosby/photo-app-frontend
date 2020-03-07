import React from 'react'
import '../_button.scss'
import GoogleLogin from 'react-google-login'
import PropTypes from 'prop-types'

const GoogleBtn = ({ text, onSuccess, onFail, style }) => 
  <GoogleLogin
    clientId={process.env.REACT_APP_GOOGLE_AUTH_ID}
    render={renderProps => (
      <button 
        onClick={renderProps.onClick} 
        disabled={renderProps.disabled}
        className="button"
        style={style}>
        <img alt="Google Logo" src={require('../../../../static/logo/google.png')}/>
        <p>{text}</p>
      </button>
    )}
    onSuccess={onSuccess}
    onFailure={onFail}
    cookiePolicy={'single_host_origin'}/>

GoogleLogin.propTypes = {
  onSuccess: PropTypes.func, // oAuth success res.
  onFail: PropTypes.func, // oAuth fail res.
  text: PropTypes.string, // Text on the button.
  style: PropTypes.object // Can change style on Component call.
}

export default GoogleBtn