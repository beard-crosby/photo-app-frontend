import axios from 'axios'
import { logout, logInSuccess } from './localStorage'
import { headers, timeout, checkGeolocation, checkAuth } from './utility'

export const createUser = (formData, history, user, setUser, setLoading) => {
  setLoading(true)
  axios.post('', {
    variables: {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      passConfirm: formData.passConfirm,
    },
    query: `
      mutation CreateUser($name: String!, $email: String!, $password: String!, $passConfirm: String! ) {
        createUser(userInput: { name: $name, email: $email, password: $password, pass_confirm: $passConfirm }) {
          _id
          status
          token
          token_expiry
          logged_in_at
          geolocation
          name
          email
          website
          bio  
          profile_picture
          settings
          posts {
            _id
          }
          following {
            _id
          }
          favourites {
            _id
          }
        }
      }
    `
  }).then(res => {
    if (res.data.errors) {
      setUser({...user, formErrors: res.data.errors[0].message})
      process.env.NODE_ENV === 'development' && console.log(`CreateUser Error: ${res.data.errors[0].message}`)
    } else {
      const userData = {
        ...res.data.data.createUser, 
        geolocation: JSON.parse(res.data.data.createUser.geolocation), 
        settings: JSON.parse(res.data.data.createUser.settings),
        file: { uploaded: false },
      }
      setUser(logInSuccess(userData))
      timeout(userData, setUser, history)
      history.push("/")
      checkGeolocation(userData, setUser, history)
      process.env.NODE_ENV === 'development' && console.log(res)
    }
    setLoading(false)
  }).catch(err => {
    setUser({...user, formErrors: err.response.data.errors[0].message})
    process.env.NODE_ENV === 'development' && console.log(`CreateUser Error: ${err}`)
    setLoading(false)
  })
}

export const login = (formData, history, user, setUser, setLoading) => {
  setLoading(true)
  axios.post('', {
    variables: {
      email: formData.email,
      password: formData.password,
    },
    query: `
      query Login( $email: String!, $password: String!) {
        login( email: $email, password: $password) {
          _id
          status
          token
          token_expiry
          logged_in_at
          geolocation
          name
          email
          website
          bio
          profile_picture
          settings
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
            status
            name
            email
            website
            bio
            profile_picture
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
          favourites {
            _id
            img
            title
            description
            created_at
            updated_at
            author {
              _id
              name
              email
              website
              bio
              profile_picture
            }
          }
        }
      }
    `
  }).then(res => {
    if (res.data.errors) {
      setUser({...user, formErrors: res.data.errors[0].message})
      process.env.NODE_ENV === 'development' && console.log(`Login Error: ${res.data.errors[0].message}`)
    } else {
      const userData = {
        ...res.data.data.login, 
        geolocation: JSON.parse(res.data.data.login.geolocation), 
        settings: JSON.parse(res.data.data.login.settings),
        file: { uploaded: false },
      }
      setUser(logInSuccess(userData))
      timeout(userData, setUser, history)
      history.push("/")
      checkGeolocation(userData, setUser, history)
      process.env.NODE_ENV === 'development' && console.log(res)
    }
    setLoading(false)
  }).catch(err => {
    setUser({...user, formErrors: err.response.data.errors[0].message})
    process.env.NODE_ENV === 'development' && console.log(`Login Error: ${err}`)
    setLoading(false)
  })
}

export const deleteAccount = (user, setUser, setLoading, history) => {
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
          email
        }
      }
    `
  }, { headers: headers(user.token) }).then(res => {
    if (res.data.errors) {
      checkAuth(res, setUser, history)
      process.env.NODE_ENV === 'development' && console.log(`DeleteAccount Error: ${res.data.errors[0].message}`)
    } else {
      setUser(logout())
      history.push("/")
      process.env.NODE_ENV === 'development' && console.log(res)
    }
    setLoading(false)
  }).catch(err => {
    process.env.NODE_ENV === 'development' && console.log(`DeleteAccount Error: ${err}`)
    setLoading(false)
  })
}

export const updateBio = (user, setUser, history) => {
  axios.post('', {
    variables: {
      _id: user._id,
      bio: user.bio,
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
      checkAuth(res, setUser, history)
      process.env.NODE_ENV === 'development' && console.log(`UpdateBio Error: ${res.data.errors[0].message}`)
    } else {
      process.env.NODE_ENV === 'development' && console.log(res)
    }
  }).catch(err => {
    process.env.NODE_ENV === 'development' && console.log(`UpdateBio Error: ${err}`)
  })
}

export const updatePP = (user, setUser, history, setLoading) => {
  setLoading(true)
  axios.post('', {
    variables: {
      _id: user._id,
      profile_picture: user.file.url,
    },
    query: `
      mutation UpdatePP($_id: ID!, $profile_picture: String!) {
        updatePP(_id: $_id, profile_picture: $profile_picture) {
          _id
          profile_picture
        }
      }
    `
  }, { headers: headers(user.token) }).then(res => {
    if (res.data.errors) {
      checkAuth(res, setUser, history)
      process.env.NODE_ENV === 'development' && console.log(`UpdatePP Error: ${res.data.errors[0].message}`)
    } else {
      setUser({ ...user, profile_picture: res.data.data.updatePP.profile_picture, file: { uploaded: false }})
      localStorage.setItem('profile_picture', res.data.data.updatePP.profile_picture)
      history.push("/")
      process.env.NODE_ENV === 'development' && console.log(res)
    }
    setLoading(false)
  }).catch(err => {
    setLoading(false)
    process.env.NODE_ENV === 'development' && console.log(`UpdatePP Error: ${err}`)
  })
}