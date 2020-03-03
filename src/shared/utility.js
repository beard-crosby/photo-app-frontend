import { logout } from './localStorage'

export const checkTimeout = expirationTime => {
  setTimeout(() => {
    logout()
    process.env.NODE_ENV === 'development' && console.log(`[localStorage.js] Token Expired!`)
  }, expirationTime * 3600000)
}

export const headers = token => {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }
}