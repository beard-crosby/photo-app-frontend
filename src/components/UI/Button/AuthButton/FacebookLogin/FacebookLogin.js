import React from 'react'
import * as classes from '../_AuthBtn.module.scss'
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
        className={classes.btnStyle}
        style={style}
        type="button">
        <img alt="Google Logo" src={require('../../../../../static/logo/facebook.png')}/>
        <h4>{text}</h4>
      </button>
    )} />

FacebookBtn.propTypes = {
  res: PropTypes.func,
  style: PropTypes.object,
  text: PropTypes.string
}

export default FacebookBtn