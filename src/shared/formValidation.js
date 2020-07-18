export const updateForm = (e, form, setFormErrors) => {
  if (setFormErrors) {
    switch (e.target.name) {
      case "name": /^[a-zA-Z\s-']{6,30}$/.test(e.target.value) || e.target.value.trim() === "" ? 
        setFormErrors("") : 
        setFormErrors("Your Name cannot contain numbers or special characters other than hyphens and apostrophes."); break
      case "email": /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(e.target.value) || e.target.value.trim() === "" ? // eslint-disable-line
        setFormErrors("") : 
        setFormErrors("Please enter a valid email address."); break
      case "password": /^([a-zA-Z0-9!?_<>"'$£%^&(){};:+=*#]{8,20})$/.test(e.target.value) || e.target.value.trim() === "" ? 
        setFormErrors("") : 
        setFormErrors("Your Password must have at least one letter and one number."); break
      case "passConfirm": e.target.value === form.password || e.target.value.trim() === "" ? 
        setFormErrors("") : 
        setFormErrors("Passwords do not match."); break
      case "add a website": /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(e.target.value) || e.target.value.trim() === "" ?  // eslint-disable-line 
        setFormErrors("") : 
        setFormErrors("Please enter a valid URL"); break
      default: setFormErrors("")
    }
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