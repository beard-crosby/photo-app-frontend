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
      const email = localStorage.getItem('email')
      const website = localStorage.getItem('website')
      const info = JSON.parse(localStorage.getItem('info'))
      const profile_picture = localStorage.getItem('profile_picture')
      const posts = JSON.parse(localStorage.getItem('posts'))
      const following = JSON.parse(localStorage.getItem('following'))
      const logged_in_at = localStorage.getItem('logged_in_at')
      const geolocation = JSON.parse(localStorage.getItem('geolocation'))
      const settings = JSON.parse(localStorage.getItem('settings'))
      const favourites = JSON.parse(localStorage.getItem('favourites'))

      const userData = {
        localStorage: true,
        status: "online",
        _id: _id,
        token: token,
        token_expiry: token_expiry,
        name: name,
        email: email,
        website: website,
        info: info,
        profile_picture: profile_picture,
        posts: posts,
        following: following,
        logged_in_at: logged_in_at,
        geolocation: geolocation,
        settings: settings,
        favourites: favourites,
        formErrors: {},
        file: { uploaded: false },
      }

      return userData
    }
  }
}

export const logout = () => {
  localStorage.removeItem('_id')
  localStorage.removeItem('token')
  localStorage.removeItem('token_expiry')
  localStorage.removeItem('name')
  localStorage.removeItem('email')
  localStorage.removeItem('website')
  localStorage.removeItem('info')
  localStorage.removeItem('profile_picture')
  localStorage.removeItem('posts')
  localStorage.removeItem('following')
  localStorage.removeItem('logged_in_at')
  localStorage.removeItem('geolocation')
  localStorage.removeItem('settings')
  localStorage.removeItem('favourites')

  const userData = {
    settings: { dark_mode: false },
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
    localStorage.setItem('info', JSON.stringify(userData.info))
    localStorage.setItem('profile_picture', userData.profile_picture)
    localStorage.setItem('posts', JSON.stringify(userData.posts))
    localStorage.setItem('following', JSON.stringify(userData.following))
    localStorage.setItem('logged_in_at', userData.logged_in_at)
    localStorage.setItem('settings', JSON.stringify(userData.settings))
    localStorage.setItem('favourites', JSON.stringify(userData.favourites))
  }

  return {
    ...userData, 
    status: "online",
    formErrors: {},
    file: { uploaded: false },
  }
}