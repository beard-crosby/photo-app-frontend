import { logout } from './localStorage'
import { updateSettings, updateGeolocation } from './miscRequests'
import moment from "moment"

// Onload = true, check dark-mode in context and switch if needed. Else, switch dark_mode in context and switch in db also.
export const switchDarkMode = (user, setUser, Onload, history) => {
  if (Onload) {
    if (user.settings.dark_mode) {
      document.body.classList.add('dark-mode')
      localStorage.setItem("settings", JSON.stringify({ ...user.settings, dark_mode: true }))
    } else {
      document.body.classList.remove('dark-mode')
      localStorage.setItem("settings", JSON.stringify({ ...user.settings, dark_mode: false }))
    }
  } else {
    setUser({ ...user, settings: { ...user.settings, dark_mode: !user.settings.dark_mode} })
    user.token && updateSettings({ ...user, settings: { ...user.settings, dark_mode: !user.settings.dark_mode} }, setUser, history) // request
  }
}

// If logged in for 1h (3600000ms), then logout().
export const timeout = (user, setUser, history) => {
  setTimeout(() => {
    setUser(logout())
    history.push("/loggedout")
    process.env.NODE_ENV === 'development' && console.log("Token Expired!")
  }, user.token_expiry * 3600000)
}

// Add headers to a request
export const headers = token => {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }
}

// Check Geolocation. If no geolocation data or user has moved update User, update localStorage & update database. 
export const checkGeolocation = (userData, setUser, history) => {
  if ("geolocation" in navigator) {
    return navigator.geolocation.getCurrentPosition(position => {
      const currentGeo = { lat: Number(position.coords.latitude), lon: Number(position.coords.longitude)}
      localStorage.setItem('geolocation', JSON.stringify(currentGeo))
      if (userData.geolocation === null || userData.geolocation.lat !== currentGeo.lat || userData.geolocation.lon !== currentGeo.lon) {
        setUser({...userData, geolocation: currentGeo})
        updateGeolocation(userData, setUser, JSON.stringify(currentGeo), history)
      }
    })
  } else {
    process.env.NODE_ENV === 'development' && console.log("Geolocation Not Available!")
  }
}

// Format name of all files to be uploaded to s3.
export const formatFilename = (username, filename) => {
  const cleanFilename = `${moment().format()}-${filename}`
  const newFilename = `${username.toLowerCase().replace(/[^a-z0-9]/g, "-")}/${cleanFilename.toLowerCase().replace(/[^a-z0-9]/g, "-")}`
  return newFilename
}

// If no authentication, logout and redirect.
export const checkAuth = (res, setUser, history) => {
  if (res.data.errors[0].message === "Not Authenticated!") {
    setUser(logout())
    history.push("/loggedout")
  }
}

// Remove a key: value pair from context.
export const removeKey = (obj, prop) => {
  // myObj.hasOwnProperty(prop)
  let {[prop]: omit, ...res} = obj
  return res
}