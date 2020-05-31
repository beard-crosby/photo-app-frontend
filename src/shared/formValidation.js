export const updateForm = (event, form, setForm) => {
  switch (event.target.name) {
    case "name": if (/^[a-zA-Z\s-']{6,30}$/.test(event.target.value) || event.target.value.trim() === "") {
      setForm({...form, values: { ...form.values, name: event.target.value }, errors: { ...form.errors, nameError: "" }})
    } else {
      setForm({...form, values: { ...form.values, name: event.target.value }, errors: { ...form.errors, nameError: "Your Name must only have letters, spaces, -' characters and be 6-15 characters in length." }})
    }; break
    case "email": if (/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(event.target.value) || event.target.value.trim() === "") { //eslint-disable-line
      setForm({...form, values: { ...form.values, email: event.target.value }, errors: { ...form.errors, emailError: "" }})
    } else {
      setForm({...form, values: { ...form.values, email: event.target.value }, errors: { ...form.errors, emailError: "Please enter a valid email address." }})
    }; break
    case "password": if (/^([a-zA-Z0-9!?_<>"'$£%^&(){};:+=*#]{8,20})$/.test(event.target.value) || event.target.value.trim() === "") {
      setForm({...form, values: { ...form.values, password: event.target.value }, errors: { ...form.errors, passwordError: "" }})
    } else {
      setForm({...form, values: { ...form.values, password: event.target.value }, errors: { ...form.errors, passwordError: "Your Password must have at least one letter, one number and be 8-20 characters in length. Special characters are optional." }})
    }; break
    case "password check": if (event.target.value === form.values.password || event.target.value.trim() === "") {
      setForm({...form, values: { ...form.values, passConfirm: event.target.value }, errors: { ...form.errors, passConfirmError: "" }})
    } else {
      setForm({...form, values: { ...form.values, passConfirm: event.target.value }, errors: { ...form.errors, passConfirmError: "Passwords must be the same." }})
    }; break
    default: setForm({...form, [event.target.name]: event.target.value })
  }
}

// If there is a backend error, return it. If not, return passed string.
export const backendError = (user, passed) => {
  if (passed === "Email") {
    switch (user.formErrors) {
      case "An account by that email already exists! Please try and login.": return user.formErrors
      case "A Google account by that email already exists! Please try and login.": return user.formErrors
      case "An Account by that Email was not found!": return user.formErrors
      case "The account for this email is a Google account.": return user.formErrors
      case "The account for this email wasn't created with Google.": return user.formErrors
      case "Sign up with Google failed. Please try another method.": return user.formErrors
      case "Login with Google failed. Please try again.": return user.formErrors
      default: return passed
    }
  } else if (passed === "Password") {
    switch (user.formErrors) {
      case "Incorrect Password.": return user.formErrors
      case "Please enter your password.": return user.formErrors
      case "Passwords do not match.": return user.formErrors
      default: return passed
    }
  } else {
    return passed
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