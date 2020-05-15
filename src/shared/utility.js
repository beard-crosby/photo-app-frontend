import { logout } from './localStorage'
import { updateSettings, updateGeolocation } from './miscRequests'
import moment from "moment"

// 
export const switchDarkMode = (user, setUser, Onload) => {
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
    updateSettings({ ...user, settings: { ...user.settings, dark_mode: !user.settings.dark_mode} }, setUser) // request
  }
}

// If logged in for 1h (3600000ms), then logout().
export const timeout = (expirationTime, setUser) => {
  setTimeout(() => {
    setUser({ ...logout(), redirect: "/loggedout" })
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

// Check Geolocation. If no geolocation data or user has moved update User, update localStorage & update database. 
export const checkGeolocation = (userData, setUser) => {
  if ("geolocation" in navigator) {
    return navigator.geolocation.getCurrentPosition(position => {
      const currentGeo = { lat: Number(position.coords.latitude), lon: Number(position.coords.longitude)}
      localStorage.setItem('geolocation', JSON.stringify(currentGeo))
      if (userData.geolocation === null || userData.geolocation.lat !== currentGeo.lat || userData.geolocation.lon !== currentGeo.lon) {
        setUser({...userData, geolocation: currentGeo})
        updateGeolocation(userData, setUser, JSON.stringify(currentGeo))
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

// If there is a backend error, return it. If not, return passed string.
export const backendError = (user, passed) => {
  if (passed === "Email") {
    switch (user.formErrors) {
      case "An Account by that Email already exists!": return user.formErrors
      case "An Account by that Email was not found!": return user.formErrors
      default: return passed
    }
  } else if (passed === "Password") {
    switch (user.formErrors) {
      case "Incorrect Password": return user.formErrors
      case "Passwords do not match.": return user.formErrors
      default: return passed
    }
  }
}

// Change width of posts div in profile page based on how many posts a user has.
export const postsWidth = posts => {
  let postsWidth = "700px"
  switch (posts.length) {
    case 1: postsWidth = "100px"; break
    case 2: postsWidth = "200px"; break
    case 3: postsWidth = "300px"; break
    case 4: postsWidth = "400px"; break
    case 5: postsWidth = "500px"; break
    case 6: postsWidth = "600px"; break
    case 7: postsWidth = "700px"; break
    default: postsWidth = "700px";
  }
  return postsWidth
}