import React from 'react'
import * as classes from './_Model.module.scss'
import PropTypes from 'prop-types'

const Model = ({ style, children, display, title, bottom, bottomStyle, onClick }) => 
    <div className={`${classes.BG} ${display && classes.display}`} style={style}>
      <div className={classes.wrapper}>
      {title && <div className={classes.top}>{
        <>
          {title}
          <h5 onClick={onClick} className={classes.back}>BACK</h5>
        </>
      }</div>}
      {children}
      {bottom && <div className={classes.bottom} style={bottomStyle}>{bottom}</div>}
      </div>
    </div>

Model.propTypes = {
  style: PropTypes.object,
  display: PropTypes.bool,
  title: PropTypes.element,
  bottom: PropTypes.element,
  bottomStyle: PropTypes.object,
  onClick: PropTypes.func
}

export default Model