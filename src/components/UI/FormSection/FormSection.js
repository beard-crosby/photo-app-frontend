import React, { useState } from 'react'
import { updateForm } from '../../../shared/formValidation'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const FormSection = ({ label, form, setForm, setFormErrors, textarea, onFocus, placeholder, defaultValue, minLength, maxLength, forgot }) => {
  const [ targetLength, setTargetLength ] = useState(0)
  const [ minLen, setMinLen ] = useState(null)
  const [ error, setError ] = useState(null)

  let type = label
  switch (label) {
    case "Name": type = "text"; break
    case "Password Check": type = "password"; break
    case "Title": type = "text"; break
    case "Description": type = "text"; break
    case "Add a Website": type = "url"; break
    default: type = label
  }

  const onChangeHandler = e => {
    if (e.target.name === "add a website") {
      e.target.name = "website"
    } else if (e.target.name === "password check") {
      e.target.name = "passConfirm"
    }

    setForm({...form, [e.target.name]: e.target.value})

    const length = e.target.value.length
    setTargetLength(length)

    if (setFormErrors) {
      setFormErrors(updateForm(e, form))
      updateForm(e, form) !== "" ? setError("error") : setError(null)
    }

    if (length > 0 && length < minLength) {
      setMinLen(<p>{`${minLength} characters minimum`}</p>)
    } else {
      setMinLen(null)
    }
  }

  return (
    <>
      <label htmlFor={label.toLowerCase()}>
        <h5 className={error}>{label}</h5>
        {forgot && targetLength === 0 && <Link to="/forgot"><h6>Forgot?</h6></Link>}
        {minLen ? minLen : maxLength && targetLength > maxLength - 20 && <p>{`${maxLength - targetLength} characters left`}</p>}
      </label>
      {textarea ? 
        <textarea 
          type={type.toLowerCase()} 
          name={label.toLowerCase()} 
          id={label.toLowerCase()} 
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
          name={label.toLowerCase()} 
          id={label.toLowerCase()}
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
  label: PropTypes.string.isRequired, // text for the label.
  form: PropTypes.object.isRequired,  // form object on which this component is called for.
  setForm: PropTypes.func.isRequired, // setForm function on which this component is called for.
  setFormErrors: PropTypes.func,      // setFormErrors on which page this component is called for.
  textarea: PropTypes.bool,           // true = Render a <textarea> instead of an <input>.
  onFocus: PropTypes.func,            // pass up the onFocus event.
  placeholder: PropTypes.string,      // placeholder passed up.
  defaultValue: PropTypes.string,     // defaultValue passed up.
  minLength: PropTypes.string,        // minLength passed up.
  maxLength: PropTypes.string,        // maxLength passed up.
  forgot: PropTypes.bool,             // include forgot link.
}

export default FormSection