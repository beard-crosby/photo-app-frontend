export const checkLocalStorage = () => {
  const token = localStorage.getItem('token')
  if (!token) {
    return { ...logout(), redirect: false }
  } else {
    const token_expiry = new Date(localStorage.getItem('token_expiry'))
    if (token_expiry < new Date()) {
      return { ...logout(), redirect: false }
    } else {
      const _id = localStorage.getItem('_id')
      const name = localStorage.getItem('name')
      const email = localStorage.getItem('email')
      const website = localStorage.getItem('website')
      const bio = localStorage.getItem('bio')
      const profile_img = localStorage.getItem('profile_img')
      const posts = localStorage.getItem('posts')
      const following = localStorage.getItem('following')
      const dark_mode = localStorage.getItem('dark_mode')
      const logged_in_at = localStorage.getItem('logged_in_at')
      const geolocation = localStorage.getItem('geolocation')

      const userData = {
        localStorage: true,
        _id: _id,
        token: token,
        token_expiry: token_expiry,
        name: name,
        email: email,
        website: website,
        bio: bio,
        profile_img: profile_img,
        posts: JSON.parse(posts),
        following: JSON.parse(following),
        dark_mode: JSON.parse(dark_mode.toLowerCase()),
        logged_in_at: logged_in_at,
        geolocation: JSON.parse(geolocation),
        formErrors: {},
        redirect: false,
      }

      return userData
    }
  }
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('token_expiry')
  localStorage.removeItem('_id')
  localStorage.removeItem('name')
  localStorage.removeItem('email')
  localStorage.removeItem('website')
  localStorage.removeItem('bio')
  localStorage.removeItem('profile_img')
  localStorage.removeItem('posts')
  localStorage.removeItem('following')
  localStorage.removeItem('dark_mode')
  localStorage.removeItem('logged_in_at')
  localStorage.removeItem('geolocation')

  const userData = {
    _id: null,
    token: null,
    token_expiry: null,
    name: null,
    email: null,
    website: null,
    bio: "",
    profile_img: null,
    posts: null,
    following: null,
    dark_mode: false,
    logged_in_at: null,
    geolocation: null,
    formErrors: {},
    redirect: false,
  }

  return userData
}

export const logInSuccess = userData => {
  if (!userData.localStorage) {
    localStorage.setItem('_id', userData._id)
    localStorage.setItem('token', userData.token)
    localStorage.setItem('token_expiry', new Date(new Date().getTime() + userData.token_expiry * 3600000))
    localStorage.setItem('name', userData.name)
    localStorage.setItem('email', userData.email)
    localStorage.setItem('website', userData.website)
    localStorage.setItem('bio', userData.bio)
    localStorage.setItem('profile_img', userData.profile_img)
    localStorage.setItem('posts', JSON.stringify(userData.posts))
    localStorage.setItem('following', JSON.stringify(userData.following))
    localStorage.setItem('dark_mode', userData.dark_mode)
    localStorage.setItem('logged_in_at', userData.logged_in_at)
  }

  return {...userData, formErrors: {}, redirect: false}
}