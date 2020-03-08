export const formObj = {
  create: {
    name: "",
    username: "",
    email: "",
    password: "",
    passConfirm: "",
  },
  createErrors: {
    nameError: false,
    usernameError: false,
    emailError: false,
    passwordError: false,
    passConfirmError: false,
  },
  auth: {
    authForm: true,
    email: "",
    username: "",
    password: "",
  },
  forgot: ""
}

export const inputValues = forms => {
  if (document.getElementById("username_or_email")) {
    document.getElementById("username_or_email").value = forms.auth.username || forms.auth.email
    document.getElementById("password").value = forms.auth.password
  } else if (document.getElementById("forgot")) {
    document.getElementById("forgot").value = forms.forgot
  } else {
    document.getElementById("name").value = forms.create.name
    document.getElementById("username").value = forms.create.username
    document.getElementById("email").value = forms.create.email
    document.getElementById("password").value = forms.create.password
    document.getElementById("passConfirm").value = forms.create.passConfirm
  }
}