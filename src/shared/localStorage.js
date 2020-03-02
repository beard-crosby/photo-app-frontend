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
    userData.bio && localStorage.setItem('bio', userData.bio)
    userData.profileImg && localStorage.setItem('profileImg', userData.profileImg)
    localStorage.setItem('posts', JSON.stringify(userData.posts))
    localStorage.setItem('following', JSON.stringify(userData.following))
  }

  return userData
}