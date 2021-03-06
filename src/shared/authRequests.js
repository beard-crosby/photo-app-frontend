import axios from 'axios'
import { logout, logInSuccess } from './localStorage'
import { useTokens, headers, checkGeolocation, checkAuth, removeKey, isDuplicateProfilePicture, populatedUser } from './utility'

export const createUser = (data, user, setUser, setLoading, history) => {
  setLoading(true)

  axios.post('', {
    variables: {
      name: data.name,
      email: data.email,
      password: data.password,
      passConfirm: data.passConfirm,
      profile_picture: data.imageUrl,
      oAuthToken: data.token,
    },
    query: `
      mutation CreateUser($name: String!, $email: String!, $password: String, $passConfirm: String, $profile_picture: String, $oAuthToken: String) {
        createUser(userInput: {name: $name, email: $email, password: $password, pass_confirm: $passConfirm, profile_picture: $profile_picture, oAuthToken: $oAuthToken}) {
          _id
          status
          tokens
          logged_in_at
          name
          email
          website
          info  
          profile_picture
          geolocation
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
  }).then(async (res) => {
    if (res.data.errors) {
      res.data.errors[0].message === "oAuth Login" ?
      setUser({...user, formErrors: res.data.errors[0].message, data: data}) : 
      setUser({...user, formErrors: res.data.errors[0].message})
      process.env.NODE_ENV === 'development' && console.log(`CreateUser: ${res.data.errors[0].message}`)
    } else {
      const userData = {
        ...res.data.data.createUser,
        token: useTokens(res.data.data.createUser.tokens, user),
        info: JSON.parse(res.data.data.createUser.info),
        geolocation: JSON.parse(res.data.data.createUser.geolocation), 
        settings: JSON.parse(res.data.data.createUser.settings),
        file: { uploaded: false },
      }
      setUser(logInSuccess(userData))
      history.push("/signedup")
      checkGeolocation(userData, setUser, history)
      process.env.NODE_ENV === 'development' && console.log(res)
    }
    setLoading(false)
  }).catch(err => {
    process.env.NODE_ENV === 'development' && console.log(`CreateUser: ${err.response.data.errors[0].message}`)
    setUser({...user, formErrors: err.response.data.errors[0].message})
    setLoading(false)
  })
}

export const login = (data, user, setUser, setLoading, history) => {
  setLoading(true)

  if (!data.password && !data.token) {
    return setUser({...user, formErrors: "Please enter your password."})
  }

  axios.post('', {
    variables: {
      email: data.email,
      password: data.password,
      oAuthToken: data.token,
    },
    query: `
      query Login($email: String!, $password: String, $oAuthToken: String) {
        login(email: $email, password: $password, oAuthToken: $oAuthToken) {
          ${populatedUser}
        }
      }
    `
  }).then(res => {
    if (res.data.errors) {
      setUser({...user, formErrors: res.data.errors[0].message})
      process.env.NODE_ENV === 'development' && console.log(`Login: ${res.data.errors[0].message}`)
    } else {
      const userData = {
        ...res.data.data.login,
        token: useTokens(res.data.data.login.tokens, user),
        info: JSON.parse(res.data.data.login.info),
        geolocation: JSON.parse(res.data.data.login.geolocation), 
        settings: JSON.parse(res.data.data.login.settings),
        file: { uploaded: false },
      }
      setUser(logInSuccess(userData))
      history.push("/")
      checkGeolocation(userData, setUser, history)
      process.env.NODE_ENV === 'development' && console.log(res)
    }
    setLoading(false)
  }).catch(err => {
    process.env.NODE_ENV === 'development' && console.log(`Login: ${err.response.data.errors[0].message}`)
    setUser({...user, formErrors: err.response.data.errors[0].message})
    setLoading(false)
  })
}

export const deleteAccount = (user, setUser, setLoading, history) => {
  setLoading(true)
  axios.post('', {
    query: `
      mutation {
        deleteUser {
          _id
        }
      }
    `
  }, {headers: headers(user.token)}).then(res => {
    if (res.data.errors) {
      checkAuth(res, setUser, history)
      process.env.NODE_ENV === 'development' && console.log(`DeleteAccount: ${res.data.errors[0].message}`)
    } else {
      setUser(logout())
      history.push("/")
      process.env.NODE_ENV === 'development' && console.log(res)
    }
    setLoading(false)
  }).catch(err => {
    process.env.NODE_ENV === 'development' && console.log(`DeleteAccount: ${err.response.data.errors[0].message}`)
    setLoading(false)
  })
}

export const updateInfo = (user, setUser, history) => {
  axios.post('', {
    variables: {
      info: JSON.stringify(user.info),
    },
    query: `
      mutation UpdateInfo($info: String!) {
        updateInfo(info: $info) {
          info
          tokens
        }
      }
    `
  }, {headers: headers(user.token)}).then(res => {
    if (res.data.errors) {
      checkAuth(res, setUser, history)
      process.env.NODE_ENV === 'development' && console.log(`UpdateInfo: ${res.data.errors[0].message}`)
    } else {
      const tokens = res.data.data.updateInfo.tokens
      tokens && setUser({...user, token: useTokens(tokens, user)})
      localStorage.setItem('info', res.data.data.updateInfo.info)
      process.env.NODE_ENV === 'development' && console.log(res)
    }
  }).catch(err => {
    process.env.NODE_ENV === 'development' && console.log(`UpdateInfo: ${err.response.data.errors[0].message}`)
  })
}

export const updatePP = (user, setUser, wall, setWall, history, setSpinner, setTab) => {
  if (isDuplicateProfilePicture(user, user.file.url)) {
    return setUser({...user, formErrors: "Duplicate Post!", file: { uploaded: false }})
  }

  setSpinner(true)
  axios.post('', {
    variables: {
      _id: user._id,
      profile_picture: user.file.url,
    },
    query: `
      mutation UpdatePP($profile_picture: String!) {
        updatePP(profile_picture: $profile_picture) {
          profile_picture
          tokens
        }
      }
    `
  }, {headers: headers(user.token)}).then(res => {
    if (res.data.errors) {
      checkAuth(res, setUser, history)
      process.env.NODE_ENV === 'development' && console.log(`UpdatePP: ${res.data.errors[0].message}`)
    } else {
      const newPosts = user.posts.map(post => {
        return { ...post, author: { ...post.author, profile_picture: res.data.data.updatePP.profile_picture }}
      })
      const newWall = wall.map(wallPost => {
        user.posts.forEach(post => {
          if (wallPost._id === post._id) {
            wallPost = { ...wallPost, author: { ...wallPost.author, profile_picture: res.data.data.updatePP.profile_picture }}
          }
        })
        wallPost.comments = wallPost.comments.map(comment => {
          if (comment.author._id === user._id) {
            return { ...comment, author: { ...comment.author, profile_picture: res.data.data.updatePP.profile_picture }}
          } else {
            return comment
          }
        })
        return wallPost
      })
      setUser({ 
        ...user,
        token: useTokens(res.data.data.updatePP.tokens, user),
        profile_picture: res.data.data.updatePP.profile_picture,
        posts: newPosts,
        file: { uploaded: false },
      })
      setWall(newWall)
      localStorage.setItem('profile_picture', res.data.data.updatePP.profile_picture)
      localStorage.setItem('posts', JSON.stringify(newPosts))
      localStorage.setItem('wall', JSON.stringify(newWall))
      process.env.NODE_ENV === 'development' && console.log(res)
    }
    setTab && setTab("")
    setSpinner(false)
  }).catch(err => {
    setSpinner(false)
    process.env.NODE_ENV === 'development' && console.log(`UpdatePP: ${err.response.data.errors[0].message}`)
  })
}

export const updateFavourites = (user, setUser, post, action, setPostClicked, history) => {
  if (post.author._id === user._id) {
    return setUser({...user, formErrors: `${post._id} You can't favourite your own post!`})
  }

  user.favourites.forEach(fav => {
    if (post._id === fav._id) {
      return setUser({...user, formErrors: `${post._id} Duplicate Favourite!`})
    }
  })

  let newFavs = null
  if (action === "add") {
    const addFav = {...user, favourites: [ post, ...user.favourites ]}
    setUser(addFav)
    newFavs = addFav
  } else {
    const removeFav = {...user, favourites: user.favourites.filter(x => x._id !== post._id)}
    setUser(removeFav)
    setPostClicked(null)
    newFavs = removeFav
  }

  axios.post('', {
    variables: {
      post: post._id,
      action: action
    },
    query: `
      mutation UpdateFavourites($post: ID!, $action: String!) {
        updateFavourites(post: $post, action: $action) {
          tokens
        }
      }
    `
  }, {headers: headers(user.token)}).then(res => {
    if (res.data.errors) {
      checkAuth(res, setUser, history)
      setUser({...user, formErrors: `${post._id} ${res.data.errors[0].message}`})
      process.env.NODE_ENV === 'development' && console.log(`UpdateFavourites: ${res.data.errors[0].message}`)
    } else {
      const tokens = res.data.data.updateFavourites.tokens
      if (user.formErrors && tokens) {
        setUser({...removeKey(user, "formErrors"), token: useTokens(tokens, user)})
      } else if (tokens) {
        setUser({...user, token: useTokens(tokens, user)})
      } else if (user.formErrors) {
        setUser(removeKey(user, "formErrors"))
      }
      localStorage.setItem('favourites', JSON.stringify(newFavs.favourites))
      process.env.NODE_ENV === 'development' && console.log(res)
    }
  }).catch(err => {
    setUser({...user, formErrors: `${post._id} ${err.response.data.errors[0].message}`})
    process.env.NODE_ENV === 'development' && console.log(`UpdateFavourites: ${err.response.data.errors[0].message}`)
  })
}

export const updateBasic = (form, user, setUser, history, setTab) => {
  if (form.name && !/^[a-zA-Z\s-']{1,30}$/.test(form.name) && form.name.trim() !== "") {
    return setUser({...user, formErrors: "Your Name cannot contain numbers or special characters other than hyphens and apostrophes."})
  } 
  
  if (form.email && !/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(form.email) && form.email.trim() !== "") { //eslint-disable-line
    return setUser({...user, formErrors: "Please enter a valid email address."})
  } 

  if (form.website && !/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(form.website) && form.website.trim() !== "") { //eslint-disable-line
    return setUser({...user, formErrors: "Please enter a valid URL"})
  }

  axios.post('', {
    variables: {
      name: form.name,
      email: form.email,
      website: form.website,
    },
    query: `
      mutation UpdateBasic($name: String, $email: String, $website: String) {
        updateBasic(name: $name, email: $email, website: $website) {
          name
          email
          website
          tokens
        }
      }
    `
  }, {headers: headers(user.token)}).then(res => {
    if (res.data.errors) {
      checkAuth(res, setUser, history)
      process.env.NODE_ENV === 'development' && console.log(`UpdateBasic: ${res.data.errors[0].message}`)
    } else {
      setUser({
        ...removeKey(user, "formErrors"),
        token: useTokens(res.data.data.updateBasic.tokens, user),
        name: user.name === res.data.data.updateBasic.name ? user.name : res.data.data.updateBasic.name,
        email: user.email === res.data.data.updateBasic.email ? user.email : res.data.data.updateBasic.email,
        website: user.website === res.data.data.updateBasic.website ? user.website : res.data.data.updateBasic.website,
      })

      user.name !== res.data.data.updateBasic.name && localStorage.setItem('name', res.data.data.updateBasic.name)
      user.email !== res.data.data.updateBasic.email && localStorage.setItem('email', res.data.data.updateBasic.email)
      user.website !== res.data.data.updateBasic.website && localStorage.setItem('website', res.data.data.updateBasic.website)

      history.location.pathname === "/signedup" && history.push("/")
      setTab && setTab("")
      process.env.NODE_ENV === 'development' && console.log(res)
    }
  }).catch(err => {
    process.env.NODE_ENV === 'development' && console.log(`UpdateBasic: ${err.response.data.errors[0].message}`)
  })
}

export const invalidateTokens = (user, setUser, history) => {
  axios.post('', {
    query: `
      query {
        invalidateTokens {
          tokens
        }
      }
    `
  }, {headers: headers(user.token)}).then(res => {
    if (res.data.errors) {
      checkAuth(res, setUser, history)
      process.env.NODE_ENV === 'development' && console.log(`InvalidateTokens: ${res.data.errors[0].message}`)
    } else {
      const tokens = res.data.data.invalidateTokens.tokens
      tokens && setUser({...user, token: useTokens(tokens, user)})
      process.env.NODE_ENV === 'development' && console.log(res)
    }
  }).catch(err => {
    process.env.NODE_ENV === 'development' && console.log(`InvalidateTokens: ${err}`)
  })
}

export const findUser = (userID, user, setUser, history) => {
  axios.post('', {
    variables: {
      _id: userID,
    },
    query: `
      query User($_id: ID!) {
        user(_id: $_id) {
          ${populatedUser}
        }
      }
    `
  }, {headers: headers(user.token)}).then(res => {
    if (res.data.errors) {
      checkAuth(res, setUser, history)
      process.env.NODE_ENV === 'development' && console.log(`User: ${res.data.errors[0].message}`)
    } else {
      setUser({
        ...user,
        email: res.data.data.user.email,
        website: res.data.data.user.website,
        token: useTokens(res.data.data.user.tokens, user),
      })

      process.env.NODE_ENV === 'development' && console.log(res)
    }
  }).catch(err => {
    process.env.NODE_ENV === 'development' && console.log(`User: ${err}`)
  })
}