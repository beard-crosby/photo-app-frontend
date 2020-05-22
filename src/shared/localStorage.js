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
      const profile_picture = localStorage.getItem('profile_picture')
      const posts = localStorage.getItem('posts')
      const following = localStorage.getItem('following')
      const logged_in_at = localStorage.getItem('logged_in_at')
      const geolocation = localStorage.getItem('geolocation')
      const settings = localStorage.getItem('settings')
      const favourites = localStorage.getItem('favourites')

      const userData = {
        localStorage: true,
        _id: _id,
        token: token,
        token_expiry: token_expiry,
        name: name,
        email: email,
        website: website,
        bio: bio,
        profile_picture: profile_picture,
        posts: JSON.parse(posts),
        following: JSON.parse(following),
        logged_in_at: logged_in_at,
        geolocation: JSON.parse(geolocation),
        settings: JSON.parse(settings),
        favourites: JSON.parse(favourites),
        formErrors: {},
        file: { uploaded: false },
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
  localStorage.removeItem('profile_picture')
  localStorage.removeItem('posts')
  localStorage.removeItem('following')
  localStorage.removeItem('logged_in_at')
  localStorage.removeItem('geolocation')
  localStorage.removeItem('settings')
  localStorage.removeItem('favourites')

  const userData = {
    _id: null,
    token: null,
    token_expiry: null,
    name: null,
    email: null,
    website: "",
    bio: "",
    profile_picture: "",
    posts: null,
    following: null,
    settings: { dark_mode: false },
    favourites: null,
    logged_in_at: null,
    geolocation: null,
    formErrors: {},
    file: { uploaded: false },
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
    localStorage.setItem('profile_picture', userData.profile_picture)
    localStorage.setItem('posts', JSON.stringify(userData.posts))
    localStorage.setItem('following', JSON.stringify(userData.following))
    localStorage.setItem('logged_in_at', userData.logged_in_at)
    localStorage.setItem('settings', JSON.stringify(userData.settings))
    localStorage.setItem('favourites', JSON.stringify(userData.favourites))
  }

  return {
    ...userData, 
    formErrors: {},
    file: { uploaded: false },
    redirect: false,
  }
}