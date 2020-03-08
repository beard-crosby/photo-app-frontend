import axios from 'axios'
import { logout, logInSuccess } from './localStorage'
import { headers, timeout, checkGeolocation } from './utility'
import { inputValues, formObj } from './forms'

export const createUser = (forms, setForms, history, setUser, setLoading) => {
  setLoading(true)
  axios.post('', {
    variables: {
      name: forms.create.name,
      username: forms.create.username,
      email: forms.create.email,
      password: forms.create.password,
      passConfirm: forms.create.passConfirm,
      bio: forms.create.bio,
      profileImg: forms.create.profileImg,
    },
    query: `
      mutation CreateUser($name: String!, $username: String!, $email: String!, $password: String!, $passConfirm: String!, $bio: String, $profileImg: String) {
        createUser(userInput: { name: $name, username: $username, email: $email, password: $password, pass_confirm: $passConfirm, bio: $bio, profile_img: $profileImg }) {
          _id
          token
          token_expiry
          logged_in_at
          geolocation
          name
          username
          email
          bio  
          profile_img
          dark_mode
          posts {
            _id
          }
          following {
            _id
          }
        }
      }
    `
  }).then(res => {
    if (res.data.errors) {
      process.env.NODE_ENV === 'development' && console.log(`Error: ${res.data.errors[0].message}`)
      setLoading(false)
      inputValues(forms)
    } else {
      const userData = {...res.data.data.createUser, geolocation: JSON.parse(res.data.data.createUser.geolocation)}
      setUser(logInSuccess(userData))
      timeout(userData.token_expiry)
      history && history.push("/")
      checkGeolocation(userData, setUser)
      process.env.NODE_ENV === 'development' && console.log(res)
      setLoading(false)
      setForms(formObj)
    }
  }).catch(err => {
    process.env.NODE_ENV === 'development' && console.log(err)
    setLoading(false)
    inputValues(forms)
  })
}

export const login = (forms, setForms, history, setUser, setLoading) => {
  setLoading(true)
  axios.post('', {
    variables: {
      email: forms.auth.email,
      username: forms.auth.username,
      password: forms.auth.password,
    },
    query: `
      query Login(${forms.auth.email ? `$email: String!` : `$username: String!`}, $password: String!) {
        login(${forms.auth.email ? `email: $email` : `username: $username`}, password: $password) {
          _id
          token
          token_expiry
          logged_in_at
          geolocation
          name
          username
          email
          bio
          profile_img
          dark_mode
          posts {
            _id
            img
            title
            description
            comments {
              _id
              comment
              author {
                _id
              }
            }
          }
          following {
            _id
            name
            username
            email
            bio
            profile_img
            posts {
              _id
              img
              title
              description
              comments {
                _id
                comment
                author {
                  _id
                }
              }
            }
          }
        }
      }
    `
  }).then(res => {
    if (res.data.errors) {
      process.env.NODE_ENV === 'development' && console.log(`Error: ${res.data.errors[0].message}`)
      setLoading(false)
      inputValues(forms)
    } else {
      const userData = {...res.data.data.login, geolocation: JSON.parse(res.data.data.login.geolocation)}
      setUser(logInSuccess(userData))
      timeout(userData.token_expiry)
      history.push("/")
      checkGeolocation(userData, setUser)
      process.env.NODE_ENV === 'development' && console.log(res)
      setLoading(false)
      setForms(formObj)
    }

  }).catch(err => {
    process.env.NODE_ENV === 'development' && console.log(err)
    setLoading(false)
    inputValues(forms)
  })
}

export const deleteAccount = (_id, history, setUser, setLoading, token) => {
  setLoading(true)
  axios.post('', {
    variables: {
      _id: _id
    },
    query: `
      mutation DeleteUser($_id: ID!) {
        deleteUser(_id: $_id) {
          _id
          name
          username
          email
          bio
          profile_img
        }
      }
    `
  }, { headers: headers(token) }).then(res => {
    if (res.data.errors) {
      process.env.NODE_ENV === 'development' && console.log(`Error: ${res.data.errors[0].message}`)
    } else {
      setUser(logout())
      history.push("/")
      process.env.NODE_ENV === 'development' && console.log(res)
    }
    setLoading(false)
  }).catch(err => {
    process.env.NODE_ENV === 'development' && console.log(err)
    setLoading(false)
  })
}