export const checkLocalStorage = () => {
  const token = localStorage.getItem('token')
  if (!token) {
    return logout()
  } else {
    const token_expiry = new Date(localStorage.getItem('token_expiry'))
    if (token_expiry < new Date()) {
      return logout()
    } else {
      const _id = localStorage.getItem('_id')
      const name = localStorage.getItem('name')
      const username = localStorage.getItem('username')
      const email = localStorage.getItem('email')
      const bio = localStorage.getItem('bio')
      const profile_img = localStorage.getItem('profile_img')
      const posts = localStorage.getItem('posts')
      const following = localStorage.getItem('following')
      const dark_mode = localStorage.getItem('dark_mode')

      const userData = {
        localStorage: true,
        _id: _id,
        token: token,
        token_expiry: token_expiry,
        name: name,
        username: username,
        email: email,
        bio: bio,
        profile_img: profile_img,
        posts: JSON.parse(posts),
        following: JSON.parse(following),
        dark_mode: dark_mode,
      }

      return userData
    }
  }
}

export const logout = history => {
  localStorage.removeItem('token')
  localStorage.removeItem('token_expiry')
  localStorage.removeItem('_id')
  localStorage.removeItem('name')
  localStorage.removeItem('username')
  localStorage.removeItem('email')
  localStorage.removeItem('bio')
  localStorage.removeItem('profile_img')
  localStorage.removeItem('posts')
  localStorage.removeItem('following')
  localStorage.removeItem('dark_mode')

  const userData = {
    _id: null,
    token: null,
    token_expiry: null,
    name: null,
    username: null,
    email: null,
    bio: null,
    profile_img: null,
    posts: null,
    following: null,
    dark_mode: false,
  }

  history && history.push("/")
  return userData
}

export const logInSuccess = userData => {
  if (!userData.localStorage) {
    localStorage.setItem('_id', userData._id)
    localStorage.setItem('token', userData.token)
    localStorage.setItem('token_expiry', new Date(new Date().getTime() + userData.token_expiry * 3600000))
    localStorage.setItem('name', userData.name)
    localStorage.setItem('username', userData.username)
    localStorage.setItem('email', userData.email)
    userData.bio && localStorage.setItem('bio', userData.bio)
    userData.profile_img && localStorage.setItem('profile_img', userData.profile_img)
    localStorage.setItem('posts', JSON.stringify(userData.posts))
    localStorage.setItem('following', JSON.stringify(userData.following))
    localStorage.setItem('dark_mode', userData.dark_mode)
  }

  return userData
}