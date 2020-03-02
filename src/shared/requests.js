import axios from 'axios'

export const checkLocalStorage = () => {
  const token = localStorage.getItem('token')
  if (!token) {
    return logout()
  } else {
    const tokenExpiry = new Date(localStorage.getItem('tokenExpiry'))
    if (tokenExpiry < new Date()) {
      return logout()
    } else {
      const _id = localStorage.getItem('_id')
      const name = localStorage.getItem('name')
      const username = localStorage.getItem('username')
      const email = localStorage.getItem('email')
      const bio = localStorage.getItem('bio')
      const profileImg = localStorage.getItem('profileImg')
      const posts = localStorage.getItem('posts')
      const following = localStorage.getItem('following')

      const userData = {
        localStorage: true,
        _id: _id,
        token: token,
        tokenExpiry: tokenExpiry,
        name: name,
        username: username,
        email: email,
        bio: bio,
        profileImg: profileImg,
        posts: JSON.parse(posts),
        following: JSON.parse(following),
      }

      return userData
    }
  }
}

export const logout = history => {
  localStorage.removeItem('token')
  localStorage.removeItem('tokenExpiry')
  localStorage.removeItem('_id')
  localStorage.removeItem('name')
  localStorage.removeItem('username')
  localStorage.removeItem('email')
  localStorage.removeItem('bio')
  localStorage.removeItem('profileImg')
  localStorage.removeItem('posts')
  localStorage.removeItem('following')

  const userData = {
    _id: null,
    token: null,
    tokenExpiry: null,
    name: null,
    username: null,
    email: null,
    bio: null,
    profileImg: null,
    posts: null,
    following: null,
  }

  history && history.push("/")
  return userData
}

export const logInSuccess = userData => {
  if (!userData.localStorage) {
    localStorage.setItem('_id', userData._id)
    localStorage.setItem('token', userData.token)
    localStorage.setItem('tokenExpiry', new Date(new Date().getTime() + userData.tokenExpiry * 100000000))
    localStorage.setItem('name', userData.name)
    localStorage.setItem('username', userData.username)
    localStorage.setItem('email', userData.email)
    localStorage.setItem('bio', userData.bio)
    localStorage.setItem('profileImg', userData.profileImg)
    localStorage.setItem('posts', JSON.stringify(userData.posts))
    localStorage.setItem('following', JSON.stringify(userData.following))
  }

  return userData
}

export const createUser = (formData, history, setUser) => {
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
    }
  }).catch(err => console.log(err))
}

export const login = (formData, history, setUser) => {
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
    }
  }).catch(err => console.log(err))
}

export const deleteAccount = (_id, history, setUser) => {
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
    }
  }).catch(err => console.log(err))
}