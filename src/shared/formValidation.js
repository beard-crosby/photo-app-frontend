export const updateForm = (event, form, setForm, formErrors, setFormErrors) => {
  if (event.target.name === 'username_or_email') {
    if (/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(event.target.value)) { //eslint-disable-line
      setForm({...form, email: event.target.value, username: ""})
    } else {
      setForm({...form, username: event.target.value, email: ""})
    }
  }
  if (event.target.name === 'name') {
    if (/^[a-zA-Z\s-']{6,30}$/.test(event.target.value) || event.target.value.trim() === "") {
      setForm({...form, name: event.target.value})
      setFormErrors({...formErrors, nameError: false})
    } else {
      setForm({...form, name: event.target.value})
      setFormErrors({...formErrors, nameError: "Your Name must only have letters, spaces, -' characters and be 6-15 characters in length."})
    }
  }
  if (event.target.name === 'username') {
    if (/^(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$/.test(event.target.value) || event.target.value.trim() === "") {
      setForm({...form, username: event.target.value})
      setFormErrors({...formErrors, usernameError: false})
    } else {
      setForm({...form, username: event.target.value})
      setFormErrors({...formErrors, usernameError: "Your Username must have at least one letter, one number and be 6-15 characters in length."})
    }
  }
  if (event.target.name === 'email') {
    if (/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(event.target.value) || event.target.value.trim() === "") { //eslint-disable-line
      setForm({...form, email: event.target.value})
      setFormErrors({...formErrors, emailError: false})
    } else {
      setForm({...form, email: event.target.value})
      setFormErrors({...formErrors, emailError: "Please enter a valid email address."})
    }
  }
  if (event.target.name === 'password') {
    if (/^([a-zA-Z0-9!?_<>"'$£%^&(){};:+=*#]{8,20})$/.test(event.target.value) || event.target.value.trim() === "") {
      setForm({...form, password: event.target.value})
      form.passConfirm && setFormErrors({...formErrors, passwordError: false})
    } else {
      setForm({...form, password: event.target.value})
      form.passConfirm && setFormErrors({...formErrors, passwordError: "Your Password must have at least one letter, one number and be 8-20 characters in length. Special characters are optional."})
    }
  }
  if (event.target.name === 'passConfirm') {
    if (event.target.value === form.password || event.target.value.trim() === "") {
      setForm({...form, passConfirm: event.target.value})
      setFormErrors({...formErrors, passConfirmError: false})
    } else {
      setForm({...form, passConfirm: event.target.value})
      setFormErrors({...formErrors, passConfirmError: "Passwords must be the same."})
    }
  }
}

export const checkFormValid = (form, setFormValid, formErrors) => {
  if (form.authForm) {
    if (form.email && form.password || form.username && form.password) { //eslint-disable-line
      setFormValid(true)
    } else {
      setFormValid(false)
    }
  } else {
    const checkBlanks = Object.values(form).find(input => input.trim() === "")
    const checkErrors = Object.values(formErrors).find(error => error)
    if (typeof checkBlanks === 'undefined' && typeof checkErrors === 'undefined') {
      setFormValid(true)
    } else {
      setFormValid(false)
    }
  }
}