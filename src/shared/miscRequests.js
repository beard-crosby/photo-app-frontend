import axios from 'axios'
import { headers } from './utility'
import { logout } from './localStorage'

export const updateDarkMode = (user, setUser) => {
  axios.post('', {
    variables: {
      _id: user._id
    },
    query: `
      mutation SetDarkMode($_id: ID!) {
        setDarkMode(_id: $_id) {
          settings
        }
      }
    `
  }, { headers: headers(user.token) }).then(res => {
    if (res.data.errors) {
      process.env.NODE_ENV === 'development' && console.log(`UpdateDarkMode Error: ${res.data.errors[0].message}`)
      res.data.errors[0].message === "Not Authenticated!" && setUser({ ...logout(), redirect: "/loggedout" })
    } else {
      process.env.NODE_ENV === 'development' && console.log(res)
    }
  }).catch(err => {
    process.env.NODE_ENV === 'development' && console.log(`UpdateDarkMode Error: ${err}`)
  })
}

export const updateGeolocation = (user, setUser, geolocation) => {
  axios.post('', {
    variables: {
      _id: user._id,
      geo: geolocation,
    },
    query: `
      mutation UpdateGeolocation($_id: ID!, $geo: String!) {
        updateGeolocation(_id: $_id, geolocation: $geo) {
          geolocation
        }
      }
    `
  }, { headers: headers(user.token) }).then(res => {
    if (res.data.errors) {
      process.env.NODE_ENV === 'development' && console.log(`UpdateGeolocation Error: ${res.data.errors[0].message}`)
      res.data.errors[0].message === "Not Authenticated!" && setUser({ ...logout(), redirect: "/loggedout" })
    } else {
      process.env.NODE_ENV === 'development' && console.log(res)
    }
  }).catch(err => {
    process.env.NODE_ENV === 'development' && console.log(`UpdateGeolocation Error: ${err}`)
  })
}