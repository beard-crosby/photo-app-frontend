import React, { useState } from 'react'
import * as classes from './_Slider.module.scss'

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

export default Slider