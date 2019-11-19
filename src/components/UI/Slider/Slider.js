import React, { useState } from 'react'
import * as classes from './_Slider.module.scss'

const Slider = ({ textFalse, textTrue, SvgFalse, SvgTrue, style, hideMobile, hideDesktop, onClick }) => {
  const [sliderState, setSliderState] = useState(false)

  const onClickHandler = () => {
    setSliderState(!sliderState)
    onClick()
  }

  return (
    <div 
      className={`${classes.Slider} ${hideMobile && classes.hideMobile} ${hideDesktop && classes.hideDesktop}`} 
      style={style} 
      onClick={onClickHandler}>
      {sliderState ? SvgTrue : SvgFalse}
      {sliderState ? <p>{textTrue}</p> : <p>{textFalse}</p>}
      <div className={classes.SliderBG}>
        <div className={`${classes.Slider} ${sliderState && classes.SliderMove}`}/>
      </div>
    </div>
  )
}

export default Slider