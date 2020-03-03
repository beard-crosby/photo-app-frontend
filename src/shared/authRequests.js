import axios from 'axios'
import { logout, logInSuccess } from './localStorage'
import { headers, checkTimeout } from './utility'

export const createUser = (formData, history, setUser, setLoading) => {
  setLoading(true)
  axios.post('', {
    variables: {
      name: formData.name,
      username: formData.username,
      email: formData.email,
      password: formData.password,
      passConfirm: formData.passConfirm,
      bio: formData.bio,
      profileImg: formData.profileImg,
    },
    query: `
      mutation CreateUser($name: String!, $username: String!, $email: String!, $password: String!, $passConfirm: String!, $bio: String, $profileImg: String) {
        createUser(userInput: { name: $name, username: $username, email: $email, password: $password, pass_confirm: $passConfirm, bio: $bio, profile_img: $profileImg }) {
          _id
          token
          token_expiry
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
    } else {
      setUser(logInSuccess(res.data.data.createUser))
      checkTimeout(res.data.data.createUser.token_expiry)
      history.push("/")
      process.env.NODE_ENV === 'development' && console.log(res)
    }
    setLoading(false)
  }).catch(err => {
    process.env.NODE_ENV === 'development' && console.log(err)
    setLoading(false)
  })
}

export const login = (formData, history, setUser, setLoading) => {
  setLoading(true)
  axios.post('', {
    variables: {
      email: formData.email,
      username: formData.username,
      password: formData.password,
    },
    query: `
      query Login(${formData.email ? `$email: String!` : `$username: String!`}, $password: String!) {
        login(${formData.email ? `email: $email` : `username: $username`}, password: $password) {
          _id
          token
          token_expiry
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
    } else {
      setUser(logInSuccess(res.data.data.login))
      checkTimeout(res.data.data.login.token_expiry)
      history.push("/")
      process.env.NODE_ENV === 'development' && console.log(res)
    }
    setLoading(false)
  }).catch(err => {
    process.env.NODE_ENV === 'development' && console.log(err)
    setLoading(false)
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