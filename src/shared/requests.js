import axios from 'axios'

export const localStore = () => {
  const token = localStorage.getItem('token')
  if (!token) {
    return logOut()
  } else {
    const tokenExpiry = new Date(localStorage.getItem('tokenExpiry'))
    if (tokenExpiry < new Date()) {
      return logOut()
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

export const logOut = () => {
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

export const signUp = formData => {
  // start spinner
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
      console.log(res.data.errors[0].message)
      return res.data.errors[0].message
    } else {
      // checkTimeout(res.data.data.createUser.tokenExpiry)
      logInSuccess(res.data.data.createUser)
      return res.data.data.createUser
    }
  }).catch(err => console.log(err))
}

// export const checkTimeout = expirationTime => {
//   setTimeout(() => {
//     logOut()
//   }, expirationTime * 100000000)
// }