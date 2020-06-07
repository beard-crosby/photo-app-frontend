import React from 'react'
import { updateForm, backendError } from '../../../shared/formValidation'
import PropTypes from 'prop-types'

const FormSection = ({ text, err, user, form, setForm, textarea, onFocus, placeholder, defaultValue, maxLength }) => {
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
      {textarea ? 
        <textarea 
          type={type.toLowerCase()} 
          name={text.toLowerCase()} 
          id={text.toLowerCase()} 
          onChange={event => updateForm(event, form, setForm)}
          onFocus={onFocus}
          placeholder={placeholder}
          defaultValue={defaultValue}
          maxLength={maxLength}/> 
      :
        <input 
          type={type.toLowerCase()} 
          name={text.toLowerCase()} 
          id={text.toLowerCase()}
          onChange={event => updateForm(event, form, setForm)}
          placeholder={placeholder}
          defaultValue={defaultValue}
          maxLength={maxLength}/>
      }
    </>
  )
}

FormSection.propTypes = {
  text: PropTypes.string.isRequired,  // text for the label.
  err: PropTypes.string,              // what error the label should check for.
  user: PropTypes.object.isRequired,  // user object from context. 
  form: PropTypes.object.isRequired,  // form object on which this Component is called for.
  setForm: PropTypes.func.isRequired, // setForm function for which this Component is called for.
  textarea: PropTypes.bool,           // true = Render a <textarea> instead of an <input>.
  onFocus: PropTypes.func,            // pass up the onFocus event.
  placeholder: PropTypes.string,      // placeholder passed up.
  defaultValue: PropTypes.string,     // defaultValue passed up.
  maxLength: PropTypes.string,        // maxLength passed up.
}

export default FormSection