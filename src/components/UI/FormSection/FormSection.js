import React, { useState } from 'react'
import { updateForm, backendError } from '../../../shared/formValidation'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const FormSection = ({ text, err, user, form, setForm, textarea, onFocus, placeholder, defaultValue, minLength, maxLength, forgot }) => {
  const [ targetValue, setTargetValue ] = useState(0)
  const [ minLen, setMinLen ] = useState(null)

  let type = text
  switch (text) {
    case "Name": type = "text"; break
    case "Password Check": type = "password"; break
    case "Title": type = "text"; break
    case "Description": type = "text"; break
    case "Add a Website": type = "url"; break
    default: type = text
  }

  const onChangeHandler = e => {
    if (e.target.name === "add a website") {
      e.target.name = "website"
    }

    const length = e.target.value.length
    setTargetValue(length)
    updateForm(e, form, setForm)

    if (length > 0 && length < minLength) {
      setMinLen(<p>{`${minLength} characters min`}</p>)
    } else {
      setMinLen(null)
    }
  }

  return (
    <>
      <label htmlFor={text.toLowerCase()}>
        <h5>{err ? err : backendError(user, text)}</h5>
        {forgot && targetValue === 0 && <Link to="/forgot"><h6>Forgot?</h6></Link>}
        {minLen ? minLen : maxLength && targetValue > maxLength - 20 && backendError(user, text) === text && <p>{`${maxLength - targetValue} characters left`}</p>}
      </label>
      {textarea ? 
        <textarea 
          type={type.toLowerCase()} 
          name={text.toLowerCase()} 
          id={text.toLowerCase()} 
          onChange={e => onChangeHandler(e)}
          onFocus={onFocus}
          placeholder={placeholder}
          defaultValue={defaultValue}
          minLength={minLength}
          maxLength={maxLength}
        /> 
      :
        <input 
          type={type.toLowerCase()} 
          name={text.toLowerCase()} 
          id={text.toLowerCase()}
          onChange={e => onChangeHandler(e)}
          placeholder={placeholder}
          defaultValue={defaultValue}
          minLength={minLength}
          maxLength={maxLength}
        />
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
  minLength: PropTypes.string,        // minLength passed up.
  maxLength: PropTypes.string,        // maxLength passed up.
}

export default FormSection