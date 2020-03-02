import axios from 'axios'
import { logout, logInSuccess } from './localStorage'

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
        createUser(userInput: { name: $name, username: $username, email: $email, password: $password, passConfirm: $passConfirm, bio: $bio, profileImg: $profileImg }) {
          _id
          token
          tokenExpiry
          name
          username
          email
          bio  
          profileImg
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
      console.log(`Error: ${res.data.errors[0].message}`)
    } else {
      setUser(logInSuccess(res.data.data.createUser))
      history.push("/")
      process.env.NODE_ENV === 'development' && console.log(res)
    }
    setLoading(false)
  }).catch(err => {
    console.log(err)
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
          tokenExpiry
          name
          username
          email
          bio
          profileImg
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
            profileImg
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
      console.log(`Error: ${res.data.errors[0].message}`)
    } else {
      setUser(logInSuccess(res.data.data.login))
      history.push("/")
      process.env.NODE_ENV === 'development' && console.log(res)
    }
    setLoading(false)
  }).catch(err => {
    console.log(err)
    setLoading(false)
  })
}

export const deleteAccount = (_id, history, setUser, setLoading) => {
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
          profileImg
        }
      }
    `
  }).then(res => {
    if (res.data.errors) {
      console.log(`Error: ${res.data.errors[0].message}`)
    } else {
      setUser(logout())
      history.push("/")
      process.env.NODE_ENV === 'development' && console.log(res)
    }
    setLoading(false)
  }).catch(err => {
    console.log(err)
    setLoading(false)
  })
}