import React from 'react'
import * as classes from './FacebookLogin.module.scss'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { Facebook } from 'react-feather'
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
        <div className={classes.imgWrapperStyle}>
          <Facebook style={{ height: '22', width: '22', margin: '0', color: '#4367b2'}}/>
        </div>
        <span className={classes.textStyle}>{text}</span>
        </button>
    )} />

FacebookBtn.propTypes = {
  res: PropTypes.func,
  style: PropTypes.object,
  text: PropTypes.string
}

export default FacebookBtn