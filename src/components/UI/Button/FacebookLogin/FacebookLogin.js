import React from 'react'
import styles from '../_button.module.scss'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import PropTypes from 'prop-types'

const FacebookBtn = ({ res, text, style}) => 
  <FacebookLogin
    appId={process.env.REACT_APP_FACEBOOK_AUTH_ID}
    fields="name,email,picture"
    callback={res}
    render={renderProps => (
      <button 
        onClick={renderProps.onClick} 
        className={styles.button}
        style={style}
        type="button">
        <img alt="Google Logo" src={require('../../../../static/logo/facebook.png')}/>
        <p>{text}</p>
      </button>
    )} />

FacebookBtn.propTypes = {
  res: PropTypes.func, // oAuth res.
  style: PropTypes.object, // Can change style on Component call.
  text: PropTypes.string // Text on the button.
}

export default FacebookBtn