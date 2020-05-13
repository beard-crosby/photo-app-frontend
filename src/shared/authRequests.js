import axios from 'axios'
import { logout, logInSuccess } from './localStorage'
import { headers, timeout, checkGeolocation } from './utility'

export const createUser = (formData, history, user, setUser, setLoading) => {
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
      process.env.NODE_ENV === 'development' && console.log(JSON.parse(res.data.errors[0].message))
      setUser({...user, formErrors: JSON.parse(res.data.errors[0].message)})
    } else {
      const userData = {...res.data.data.createUser, geolocation: JSON.parse(res.data.data.createUser.geolocation)}
      setUser(logInSuccess(userData))
      timeout(userData.token_expiry, setUser)
      history.push("/")
      checkGeolocation(userData, setUser)
      process.env.NODE_ENV === 'development' && console.log(res)
    }
    setLoading(false)
  }).catch(err => {
    process.env.NODE_ENV === 'development' && console.log(err.response)
    setUser({...user, formErrors: JSON.parse(err.response.data.errors[0].message)})
    setLoading(false)
  })
}

export const login = (formData, history, user, setUser, setLoading) => {
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
            created_at
            updated_at
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
              created_at
              updated_at
              comments {
                _id
                comment
                created_at
                updated_at
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
      process.env.NODE_ENV === 'development' && console.log(res.data.errors[0].message)
      setUser({...user, formErrors: JSON.parse(res.data.errors[0].message)})
    } else {
      const userData = {...res.data.data.login, geolocation: JSON.parse(res.data.data.login.geolocation)}
      setUser(logInSuccess(userData))
      timeout(userData.token_expiry, setUser)
      history.push("/")
      checkGeolocation(userData, setUser)
      process.env.NODE_ENV === 'development' && console.log(res)
    }
    setLoading(false)
  }).catch(err => {
    process.env.NODE_ENV === 'development' && console.log(err.response)
    setUser({...user, formErrors: JSON.parse(err.response.data.errors[0].message)})
    setLoading(false)
  })
}

export const deleteAccount = (user, setUser, setLoading) => {
  setLoading(true)
  axios.post('', {
    variables: {
      _id: user._id,
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
  }, { headers: headers(user.token) }).then(res => {
    if (res.data.errors) {
      process.env.NODE_ENV === 'development' && console.log(JSON.parse(res.data.errors[0].message))
      res.data.errors[0].message === '{"auth":"Not Authenticated!"}' && setUser({ ...logout(), redirect: "/loggedout" })
    } else {
      setUser({ ...logout(), redirect: "/loggedout" })
      process.env.NODE_ENV === 'development' && console.log(res)
    }
    setLoading(false)
  }).catch(err => {
    process.env.NODE_ENV === 'development' && console.log(err)
    setLoading(false)
  })
}

export const updateBio = (user, setUser, bioTextarea) => {
  axios.post('', {
    variables: {
      _id: user._id,
      bio: bioTextarea,
    },
    query: `
      mutation UpdateBio($_id: ID!, $bio: String!) {
        updateBio(_id: $_id, bio: $bio) {
          _id
          bio
        }
      }
    `
  }, { headers: headers(user.token) }).then(res => {
    if (res.data.errors) {
      process.env.NODE_ENV === 'development' && console.log(JSON.parse(res.data.errors[0].message))
      res.data.errors[0].message === '{"auth":"Not Authenticated!"}' && setUser({ ...logout(), redirect: "/loggedout" })
    } else {
      process.env.NODE_ENV === 'development' && console.log(res)
    }
  }).catch(err => {
    process.env.NODE_ENV === 'development' && console.log(err)
  })
}