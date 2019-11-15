import React, { useState } from 'react'
import Form from '../components/UI/Form'

const Auth = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const updateField = e => {
    setForm({
        ...form,
        [e.target.name]: e.target.value,
    })
  } 

  return (
    <Form>
      
    </Form>
  )
}

export default Auth