import React, { useState, useEffect } from 'react'
import styles from './_Toggle.module.scss'
import Slider from './Slider/Slider'
import PropTypes from 'prop-types'

const Toggle = ({ text, Default, onClick }) => {
  const [ slide, setSlide ] = useState(Default)

  useEffect(() => setSlide(Default), [Default])

  const onClickHandler = () => {
    setSlide(!slide)
    onClick()
  }

  return (
    <div className={styles.toggle} onClick={() => onClickHandler()}>
      <h5>{text}</h5>
      <Slider slide={slide}/>
    </div>
  )
}

Toggle.propTypes = {
  text: PropTypes.string.isRequired, // Text for toggle.
  Default: PropTypes.bool,           // Default slider position.
  onClick: PropTypes.func,           // pass up onClick event.
}

export default Toggle