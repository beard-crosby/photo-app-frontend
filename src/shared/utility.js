import { logout } from './localStorage'
import { updateGeolocation } from './miscRequests'
import moment from "moment"

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

// Check Geolocation. If no geolocation data or user has moved update User, update localStorage & update database. 
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

// Format name of all files to be uploaded to s3.
export const formatFilename = (username, filename) => {
  const cleanFilename = `${moment().format()}-${filename}`
  const newFilename = `${username.toLowerCase().replace(/[^a-z0-9]/g, "-")}/${cleanFilename.toLowerCase().replace(/[^a-z0-9]/g, "-")}`
  return newFilename
}

// If there is a backend error, return it. If not, return passed string.
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

// Change width of posts div in profile page based on how many posts a user has.
export const postsWidth = posts => {
  let postsWidth = "900px"
  switch (posts.length) {
    case 1: postsWidth = "100px"; break
    case 2: postsWidth = "200px"; break
    case 3: postsWidth = "300px"; break
    case 4: postsWidth = "400px"; break
    case 5: postsWidth = "500px"; break
    case 6: postsWidth = "600px"; break
    case 7: postsWidth = "700px"; break
    case 8: postsWidth = "800px"; break
    default: postsWidth = "900px";
  }
  return postsWidth
}