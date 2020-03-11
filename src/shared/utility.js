import { logout } from './localStorage'
import { updateGeolocation } from './miscRequests'

// If user.dark_mode = true, add 'dark-mode' class to body and update localStorage. 
// Else remove it. 'dark-mode' scss class is in base.scss. 
export const switchDarkMode = user => {
  if (user.dark_mode) {
    document.body.classList.add('dark-mode')
    localStorage.setItem("dark_mode", true)
  } else {
    document.body.classList.remove('dark-mode')
    localStorage.setItem("dark_mode", false)
  }
}

// If logged in for 1h (3600000ms), then logout().
export const timeout = expirationTime => {
  setTimeout(() => {
    logout()
    process.env.NODE_ENV === 'development' && console.log("Token Expired!")
  }, expirationTime * 3600000)
}

// Add headers to a request
export const headers = token => {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }
}

// Check Geolocation. If no geolocation data or user has moved, setUser, update localStorage & update database. 
export const checkGeolocation = (userData, setUser) => {
  if ("geolocation" in navigator) {
    return navigator.geolocation.getCurrentPosition(position => {
      const currentGeo = { lat: Number(position.coords.latitude), lon: Number(position.coords.longitude)}
      localStorage.setItem('geolocation', JSON.stringify(currentGeo))
      if (userData.geolocation === null || userData.geolocation.lat !== currentGeo.lat || userData.geolocation.lon !== currentGeo.lon) {
        setUser({...userData, geolocation: currentGeo})
        updateGeolocation(userData._id, JSON.stringify(currentGeo), userData.token)
      }
    })
  } else {
    process.env.NODE_ENV === 'development' && console.log("Geolocation Not Available!")
  }
}

export const backendError = (user, passed) => {
  if (passed === "Username") {
    if (user.formErrors.username) {
      return user.formErrors.username
    } else {
      return passed
    }
  } else if (passed === "Email") {
    if (user.formErrors.email) {
      return user.formErrors.email
    } else {
      return passed
    }
  } else if (passed === "Password") {
    if (user.formErrors.password) {
      return user.formErrors.password
    } else {
      return passed
    }
  } else if (passed === "Username or Email") {
    if (user.formErrors.email) {
      return user.formErrors.email
    } else if (user.formErrors.username) {
      return user.formErrors.username
    } else {
      return passed
    }
  }
}