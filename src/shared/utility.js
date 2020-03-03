import { logout } from './localStorage'

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
export const checkTimeout = expirationTime => {
  setTimeout(() => {
    logout()
    process.env.NODE_ENV === 'development' && console.log(`[localStorage.js] Token Expired!`)
  }, expirationTime * 3600000)
}

// Add headers to a request
export const headers = token => {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }
}