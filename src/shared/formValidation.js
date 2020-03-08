export const updateForm = (event, forms, setForms, history) => {
  if (event.target.name === 'username_or_email') {
    if (/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(event.target.value)) { //eslint-disable-line
      setForms({...forms, auth: { ...forms.auth, email: event.target.value, username: "" }})
    } else {
      setForms({...forms, auth: { ...forms.auth, username: event.target.value, email: "" }})
    }
  } else if (event.target.name === 'name') {
    if (/^[a-zA-Z\s-']{6,30}$/.test(event.target.value) || event.target.value.trim() === "") {
      setForms({...forms, create: { ...forms.create, name: event.target.value }, createErrors: { ...forms.createErrors, nameError: false }})
    } else {
      setForms({...forms, create: { ...forms.create, name: event.target.value }, createErrors: { ...forms.createErrors, nameError: "Your Name must only have letters, spaces, -' characters and be 6-15 characters in length." }})
    }
  } else if (event.target.name === 'username') {
    if (/^(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$/.test(event.target.value) || event.target.value.trim() === "") {
      setForms({...forms, create: { ...forms.create, username: event.target.value }, createErrors: { ...forms.createErrors, usernameError: false }})
    } else {
      setForms({...forms, create: { ...forms.create, username: event.target.value }, createErrors: { ...forms.createErrors, usernameError: "Your Username must have at least one letter, one number and be 6-15 characters in length." }})
    }
  } else if (event.target.name === 'email') {
    if (/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(event.target.value) || event.target.value.trim() === "") { //eslint-disable-line
      setForms({...forms, create: { ...forms.create, email: event.target.value }, createErrors: { ...forms.createErrors, emailError: false }})
    } else {
      setForms({...forms, create: { ...forms.create, email: event.target.value }, createErrors: { ...forms.createErrors, emailError: "Please enter a valid email address." }})
    }
  } else if (event.target.name === 'password') {
    if (/^([a-zA-Z0-9!?_<>"'$£%^&(){};:+=*#]{8,20})$/.test(event.target.value) || event.target.value.trim() === "") {
      setForms({...forms, create: { ...forms.create, password: event.target.value }, createErrors: { ...forms.createErrors, passwordError: false }})
    } else {
      setForms({...forms, create: { ...forms.create, password: event.target.value }, createErrors: { ...forms.createErrors, passwordError: "Your Password must have at least one letter, one number and be 8-20 characters in length. Special characters are optional." }})
    }
  } else if (event.target.name === 'passConfirm') {
    if (event.target.value === forms.create.password || event.target.value.trim() === "") {
      setForms({...forms, create: { ...forms.create, passConfirm: event.target.value }, createErrors: { ...forms.createErrors, passConfirmError: false }})
    } else {
      setForms({...forms, create: { ...forms.create, passConfirm: event.target.value }, createErrors: { ...forms.createErrors, passConfirmError: "Passwords must be the same." }})
    }
  }
}

export const checkFormValid = (forms, setFormValid) => {
  if (forms.authForm) {
    if (forms.email && forms.password || forms.username && forms.password) { //eslint-disable-line
      setFormValid(true)
    } else {
      setFormValid(false)
    }
  } else {
    const checkBlanks = Object.values(forms.create).find(input => input.trim() === "")
    const checkErrors = Object.values(forms.createErrors).find(error => error)
    if (typeof checkBlanks === 'undefined' && typeof checkErrors === 'undefined') {
      setFormValid(true)
    } else {
      setFormValid(false)
    }
  }
}