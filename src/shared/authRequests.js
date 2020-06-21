import axios from 'axios'
import { logout, logInSuccess } from './localStorage'
import { headers, timeout, checkGeolocation, checkAuth, removeKey, isDuplicateProfilePicture } from './utility'

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
          token
          token_expiry
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
      setUser({...user, formErrors: res.data.errors[0].message, data: res.data.errors[0].message === "oAuth Login" ? data : null})
      process.env.NODE_ENV === 'development' && console.log(`CreateUser: ${res.data.errors[0].message}`)
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
              comment
              created_at
              updated_at
              author {
                _id
                name
                profile_picture
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
                comment
                created_at
                updated_at
                author {
                  _id
                  name
                  profile_picture
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
              comment
              created_at
              updated_at
              author {
                _id
                name
                profile_picture
              }
            }
          }
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
    process.env.NODE_ENV === 'development' && console.log(`Login: ${err.response.data.errors[0].message}`)
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
      _id: user._id,
      info: JSON.stringify(user.info),
    },
    query: `
      mutation UpdateInfo($_id: ID!, $info: String!) {
        updateInfo(_id: $_id, info: $info) {
          info
        }
      }
    `
  }, {headers: headers(user.token)}).then(res => {
    if (res.data.errors) {
      checkAuth(res, setUser, history)
      process.env.NODE_ENV === 'development' && console.log(`UpdateInfo: ${res.data.errors[0].message}`)
    } else {
      localStorage.setItem('info', res.data.data.updateInfo.info)
      process.env.NODE_ENV === 'development' && console.log(res)
    }
  }).catch(err => {
    process.env.NODE_ENV === 'development' && console.log(`UpdateInfo: ${err.response.data.errors[0].message}`)
  })
}

export const updatePP = (user, setUser, wall, setWall, history, setLoading) => {
  if (isDuplicateProfilePicture(user, user.file.url)) {
    return setUser({...user, formErrors: "Duplicate Post!", file: { uploaded: false }})
  }

  setLoading(true)
  axios.post('', {
    variables: {
      _id: user._id,
      profile_picture: user.file.url,
    },
    query: `
      mutation UpdatePP($_id: ID!, $profile_picture: String!) {
        updatePP(_id: $_id, profile_picture: $profile_picture) {
          profile_picture
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
        profile_picture: res.data.data.updatePP.profile_picture,
        posts: newPosts,
        file: { uploaded: false },
      })
      setWall(newWall)
      localStorage.setItem('profile_picture', res.data.data.updatePP.profile_picture)
      localStorage.setItem('posts', JSON.stringify(newPosts))
      localStorage.setItem('wall', JSON.stringify(newWall))
      history.push("/")
      process.env.NODE_ENV === 'development' && console.log(res)
    }
    setLoading(false)
  }).catch(err => {
    setLoading(false)
    process.env.NODE_ENV === 'development' && console.log(`UpdatePP: ${err.response.data.errors[0].message}`)
  })
}

export const updateFavourites = (user, setUser, post, action, history) => {
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
    const removeFav = {...removeKey(user, "postClicked"), favourites: user.favourites.filter(x => x._id !== post._id)}
    setUser(removeFav)
    newFavs = removeFav
  }

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
        }
      }
    `
  }, {headers: headers(user.token)}).then(res => {
    if (res.data.errors) {
      checkAuth(res, setUser, history)
      setUser({...user, formErrors: `${post._id} ${res.data.errors[0].message}`})
      process.env.NODE_ENV === 'development' && console.log(`UpdateFavourites: ${res.data.errors[0].message}`)
    } else {
      user.formErrors && setUser(removeKey(user, "formErrors"))
      localStorage.setItem('favourites', JSON.stringify(newFavs.favourites))
      process.env.NODE_ENV === 'development' && console.log(res)
    }
  }).catch(err => {
    setUser({...user, formErrors: `${post._id} ${err.response.data.errors[0].message}`})
    process.env.NODE_ENV === 'development' && console.log(`UpdateFavourites: ${err.response.data.errors[0].message}`)
  })
}

export const updateBasic = (form, user, setUser, history) => {
  if (form.name) {
    if (form.name === "delete") {
      return setUser({...user, formErrors: "You cannot delete your name! Feel free to use a fake name!"})
    } else if (!/^[a-zA-Z\s-']{6,30}$/.test(form.name)) {
      return setUser({...user, formErrors: "Your Name must only have letters, spaces, -' characters and be 6-15 characters in length."})
    } 
  }
  
  if (form.email && form.email !== "delete") {
    if (!/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(form.email)) { //eslint-disable-line
      return setUser({...user, formErrors: "Please enter a valid email address."})
    } 
  }

  if (form.website && form.website !== "delete") {
    if (!/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(form.website)) { //eslint-disable-line
      return setUser({...user, formErrors: "Please enter a valid URL"})
    }
  }

  axios.post('', {
    variables: {
      _id: user._id,
      name: form.name && form.name,
      email: form.email && form.email,
      website: form.website && form.website,
    },
    query: `
      mutation UpdateBasic($_id: ID!, $name: String, $email: String, $website: String) {
        updateBasic(_id: $_id, name: $name, email: $email, website: $website) {
          _id
          name
          email
          website
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
        name: user.name === res.data.data.updateBasic.name ? user.name : res.data.data.updateBasic.name,
        email: user.email === res.data.data.updateBasic.email ? user.email : res.data.data.updateBasic.email,
        website: user.website === res.data.data.updateBasic.website ? user.website : res.data.data.updateBasic.website,
      })
      history.location.pathname === "/signedup" && history.push("/")
      process.env.NODE_ENV === 'development' && console.log(res)
    }
  }).catch(err => {
    process.env.NODE_ENV === 'development' && console.log(`UpdateBasic: ${err.response.data.errors[0].message}`)
  })
}