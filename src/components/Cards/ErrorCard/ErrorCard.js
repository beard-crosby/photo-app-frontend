import React from 'react'
import './_ErrorCard.scss'
import Button from '../../UI/Button'
import PropTypes from 'prop-types'

const ErrorCard = ({ formErrors, setFormErrors }) => 
  <div className="error-card">
    <h5>{formErrors}</h5>
    <Button text="Close" onClick={() => setFormErrors("")}/>
  </div>
  
ErrorCard.propTypes = {
  formErrors: PropTypes.string.isRequired, // setForm function on which this component is called for.
  setFormErrors: PropTypes.func.isRequired, // setFormErrors on which page this component is called for.
}

export default ErrorCard