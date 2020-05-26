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
          info  
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
        info: JSON.parse(res.data.data.createUser.info),
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
    process.env.NODE_ENV === 'development' && console.log(`CreateUser Error: ${err}`)
    setUser({...user, formErrors: err.response.data.errors[0].message})
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
          info
          profile_picture
          settings
          posts {
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
              profile_picture
            }
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
          following {
            _id
            status
            name
            email
            website
            profile_picture
            posts {
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
                profile_picture
              }
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
              profile_picture
            }
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
    `
  }).then(res => {
    if (res.data.errors) {
      setUser({...user, formErrors: res.data.errors[0].message})
      process.env.NODE_ENV === 'development' && console.log(`Login Error: ${res.data.errors[0].message}`)
    } else {
      const userData = {
        ...res.data.data.login,
        info: JSON.parse(res.data.data.login.info),
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
    process.env.NODE_ENV === 'development' && console.log(`Login Error: ${err}`)
    setUser({...user, formErrors: err.response.data.errors[0].message})
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

export const updateInfo = (user, setUser, history) => {
  axios.post('', {
    variables: {
      _id: user._id,
      info: JSON.stringify(user.info),
    },
    query: `
      mutation UpdateInfo($_id: ID!, $info: String!) {
        updateInfo(_id: $_id, info: $info) {
          _id
          info
        }
      }
    `
  }, { headers: headers(user.token) }).then(res => {
    if (res.data.errors) {
      checkAuth(res, setUser, history)
      process.env.NODE_ENV === 'development' && console.log(`UpdateInfo Error: ${res.data.errors[0].message}`)
    } else {
      localStorage.setItem('info', res.data.data.updateInfo.info)
      process.env.NODE_ENV === 'development' && console.log(res)
    }
  }).catch(err => {
    process.env.NODE_ENV === 'development' && console.log(`UpdateInfo Error: ${err}`)
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

export const updateFavourites = (user, setUser, post, action, history) => {
  const savedUser = user
  setUser({ ...user, favourites: [ ...user.favourites, post ] })
  axios.post('', {
    variables: {
      _id: user._id,
      post: post._id,
      action: action
    },
    query: `
      mutation UpdateFavourites($_id: ID!, $post: ID!, $action: String!) {
        updateFavourites(_id: $_id, post: $post, action: $action) {
          _id
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
              profile_picture
            }
          }
        }
      }
    `
  }, { headers: headers(user.token) }).then(res => {
    if (res.data.errors) {
      checkAuth(res, setUser, history)
      res.data.errors[0].message === "Duplicate Favourite!" && setUser({ ...user, favourites: savedUser.favourites, updateFavouritesError: post._id })
      process.env.NODE_ENV === 'development' && console.log(`UpdateFavourites Error: ${res.data.errors[0].message}`)
    } else {
      localStorage.setItem('favourites', JSON.stringify(res.data.data.updateFavourites.favourites))
      process.env.NODE_ENV === 'development' && console.log(res)
    }
  }).catch(err => {
    setUser({ ...user, favourites: savedUser.favourites, updateFavouritesError: post._id })
    process.env.NODE_ENV === 'development' && console.log(`UpdateFavourites Error: ${err}`)
  })
}