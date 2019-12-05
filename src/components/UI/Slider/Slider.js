import React, { useState } from 'react'
import * as classes from './_Slider.module.scss'
import PropTypes from 'prop-types'

const Slider = ({ textFalse, textTrue, SvgFalse, SvgTrue, style, hideMobile, hideDesktop, onClick, darkMode }) => {
  const [sliderState, setSliderState] = useState(false)

  const onClickHandler = () => {
    setSliderState(!sliderState)
    onClick()
  }

  return (
    <div 
      className={`${classes.slider} ${hideMobile && classes.hideMobile} ${hideDesktop && classes.hideDesktop}`} 
      style={style} 
      onClick={onClickHandler}>
      {sliderState ? SvgTrue : SvgFalse}
      {sliderState ? <p>{textTrue}</p> : <p>{textFalse}</p>}
      <div className={darkMode ? `${classes.sliderBG} ${classes.darkMode}` : classes.sliderBG}>
        <div className={`${classes.sliderBall} ${sliderState && classes.sliderMove}`}/>
      </div>
    </div>
  )
}

// text and svg's are optional.
Slider.propTypes = {
  textFalse: PropTypes.string, // If sliderState = false, display this text.
  textTrue: PropTypes.string, // If sliderState = true, display this text.
  SvgFalse: PropTypes.element, // If sliderState = false, display this SVG.
  SvgTrue: PropTypes.element, // If sliderState = true, display this SVG.
  style: PropTypes.object, // Can change style on Component call.
  hideMobile: PropTypes.bool, // True = hide for mobile viewports.
  hideDesktop: PropTypes.bool, // True = hide for desktop viewports.
  onClick: PropTypes.func, // Passing up the onClick event.
  darkMode: PropTypes.bool, // True = change styling for darkMode.
}

export default Slider