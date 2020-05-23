import axios from 'axios'
import { headers, checkAuth } from './utility'
import { logout } from './localStorage'

export const updateSettings = (user, setUser, history) => {
  axios.post('', {
    variables: {
      _id: user._id,
      settings: JSON.stringify(user.settings),
    },
    query: `
      mutation UpdateSettings($_id: ID!, $settings: String!) {
        updateSettings(_id: $_id, settings: $settings) {
          settings
        }
      }
    `
  }, { headers: headers(user.token) }).then(res => {
    if (res.data.errors) {
      checkAuth(res, setUser, history)
      process.env.NODE_ENV === 'development' && console.log(`UpdateSettings Error: ${res.data.errors[0].message}`)
    } else {
      process.env.NODE_ENV === 'development' && console.log(res)
    }
  }).catch(err => {
    process.env.NODE_ENV === 'development' && console.log(`UpdateSettings Error: ${err}`)
  })
}

export const updateGeolocation = (user, setUser, geolocation, history) => {
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
      checkAuth(res, setUser, history)
      process.env.NODE_ENV === 'development' && console.log(`UpdateGeolocation Error: ${res.data.errors[0].message}`)
    } else {
      process.env.NODE_ENV === 'development' && console.log(res)
    }
  }).catch(err => {
    process.env.NODE_ENV === 'development' && console.log(`UpdateGeolocation Error: ${err}`)
  })
}

export const notActive = user => {
  axios.post('', {
    variables: {
      _id: user._id,
    },
    query: `
      mutation NotActive($_id: ID!) {
        notActive(_id: $_id) {
          _id
          active
        }
      }
    `
  }).then(res => {
    if (res.data.errors) {
      process.env.NODE_ENV === 'development' && console.log(`NotActive Error: ${res.data.errors[0].message}`)
    } else {
      process.env.NODE_ENV === 'development' && console.log(res)
    }
  }).catch(err => {
    process.env.NODE_ENV === 'development' && console.log(`NotActive Error: ${err}`)
  })
}