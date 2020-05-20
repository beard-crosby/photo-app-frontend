import React from 'react'
import { updateForm, backendError } from '../../../shared/formValidation'
import PropTypes from 'prop-types'

const FormSection = ({ text, err, user, form, setForm, textarea, onMouseDown }) => {
  let type = text
  switch (text) {
    case "Name": type = "text"; break
    case "Password Check": type = "password"; break
    case "Title": type = "text"; break
    case "Description": type = "text"; break
    default: type = text
  }

  return (
    <>
      <label htmlFor={text.toLowerCase()}><h5>{err ? err : backendError(user, text)}</h5></label>
      {textarea ? <textarea 
        type={type.toLowerCase()} 
        name={text.toLowerCase()} 
        id={text.toLowerCase()} 
        onChange={event => updateForm(event, form, setForm)}
        onMouseDown={onMouseDown}>
      </textarea> :
      <input 
        type={type.toLowerCase()} 
        name={text.toLowerCase()} 
        id={text.toLowerCase()} 
        onChange={event => updateForm(event, form, setForm)}>
      </input>}
    </>
  )
}

FormSection.propTypes = {
  text: PropTypes.string.isRequired,  // Text for the label.
  err: PropTypes.string,              // What error the label should check for.
  user: PropTypes.object.isRequired,  // User object from context. 
  form: PropTypes.object.isRequired,  // Form object on which this Component is called for.
  setForm: PropTypes.func.isRequired, // SetForm function for which this Component is called for.
  textarea: PropTypes.bool,           // True = Render a <textarea> instead of an <input>.
  onMouseDown: PropTypes.func,        // Pass up the onMouseDown event.
}

export default FormSection