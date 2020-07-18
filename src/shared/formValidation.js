export const updateForm = (e, form) => {
  switch (e.target.name) {
    case "name": return /^[a-zA-Z\s-']{6,30}$/.test(e.target.value) || e.target.value.trim() === "" ? "" : "Your Name cannot contain numbers or special characters other than hyphens and apostrophes."
    case "email": return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(e.target.value) || e.target.value.trim() === "" ? "" : "Please enter a valid email address." // eslint-disable-line
    case "password": return /^([a-zA-Z0-9!?_<>"'$£%^&(){};:+=*#]{8,20})$/.test(e.target.value) || e.target.value.trim() === "" ? "" : "Your Password must have at least one letter and one number."
    case "passConfirm": return e.target.value === form.password || e.target.value.trim() === "" ? "" : "Passwords do not match."
    case "add a website": return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(e.target.value) || e.target.value.trim() === "" ? "" : "Please enter a valid URL" // eslint-disable-line
    default: return ""
  }
}

export const checkFormValid = (user, form, formErrors, setFormValid) => {
  const checkBlanks = Object.values(form).find(input => input.trim() === "")
  if (typeof checkBlanks === 'undefined' && !formErrors && !user.formErrors) {
    setFormValid(true)
  } else {
    setFormValid(false)
  }
}