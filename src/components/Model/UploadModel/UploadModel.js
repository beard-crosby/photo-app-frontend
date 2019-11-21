import React, { useState } from 'react'
import Model from '../Model'
import PropTypes from 'prop-types'
import UploadBtn from '../../UI/Button/UploadBtn'
import SubmitBtn from '../../UI/Button/AuthButton/SubmitBtn'

const UploadModel = ({ onClick, display }) => {
  const [form, setForm] = useState({
    description: null,
  })

  const updateField = e => {
    setForm({
        ...form,
        [e.target.name]: e.target.value,
    })
  }

  // const uploadHandler = () => {
  //   // upload requests here
  // }

  return (
    <Model 
      display={display}
      title={<UploadBtn text="CHOOSE FILES"/>}
      onClick={onClick}>
      <div className="upload-status-wrapper">

      </div>
      <label htmlFor="description"><h5>Description</h5></label>
      <textarea
        type="text" 
        name="description" 
        id="description" 
        onChange={updateField}>
      </textarea>
      <SubmitBtn check text="Done"/>
    </Model>
  )
}

UploadModel.propTypes = {
  onClick: PropTypes.func,
  display: PropTypes.bool
}

export default UploadModel