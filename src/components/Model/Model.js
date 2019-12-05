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
  style: PropTypes.object, // Can change style on Component call.
  display: PropTypes.bool, // Model by default is set to display: 'none'. Display = true will display the component.
  title: PropTypes.element, // Title JSX at the top left of the Model.
  bottom: PropTypes.element, // JSX at the bottom of the Model.
  bottomStyle: PropTypes.object, // Style the bottom of the Model. Common use case: justifyContent: 'flex-start'.
  onClick: PropTypes.func, // Passes up the onClick event.
}

export default Model