export const updateForm = (event, form, setForm) => {
  if (event.target.name === 'name') {
    if (/^[a-zA-Z\s-']{6,30}$/.test(event.target.value) || event.target.value.trim() === "") {
      setForm({...form, values: { ...form.values, name: event.target.value }, errors: { ...form.errors, nameError: false }})
    } else {
      setForm({...form, values: { ...form.values, name: event.target.value }, errors: { ...form.errors, nameError: "Your Name must only have letters, spaces, -' characters and be 6-15 characters in length." }})
    }
  } else if (event.target.name === 'email') {
    if (/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(event.target.value) || event.target.value.trim() === "") { //eslint-disable-line
      setForm({...form, values: { ...form.values, email: event.target.value }, errors: { ...form.errors, emailError: false }})
    } else {
      setForm({...form, values: { ...form.values, email: event.target.value }, errors: { ...form.errors, emailError: "Please enter a valid email address." }})
    }
  } else if (event.target.name === 'password') {
    if (/^([a-zA-Z0-9!?_<>"'$£%^&(){};:+=*#]{8,20})$/.test(event.target.value) || event.target.value.trim() === "") {
      setForm({...form, values: { ...form.values, password: event.target.value }, errors: { ...form.errors, passwordError: false }})
    } else {
      setForm({...form, values: { ...form.values, password: event.target.value }, errors: { ...form.errors, passwordError: "Your Password must have at least one letter, one number and be 8-20 characters in length. Special characters are optional." }})
    }
  } else if (event.target.name === 'passConfirm') {
    if (event.target.value === form.values.password || event.target.value.trim() === "") {
      setForm({...form, values: { ...form.values, passConfirm: event.target.value }, errors: { ...form.errors, passConfirmError: false }})
    } else {
      setForm({...form, values: { ...form.values, passConfirm: event.target.value }, errors: { ...form.errors, passConfirmError: "Passwords must be the same." }})
    }
  }
}

export const checkFormValid = (form, setFormValid) => {
  const checkBlanks = Object.values(form.values).find(input => input.trim() === "")
  const checkErrors = Object.values(form.errors).find(error => error)
  if (typeof checkBlanks === 'undefined' && typeof checkErrors === 'undefined') {
    setFormValid(true)
  } else {
    setFormValid(false)
  }
}