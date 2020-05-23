import axios from 'axios'
import { headers, checkAuth } from './utility'

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

export const updateStatus = (user, status) => {
  axios.post('', {
    variables: {
      _id: user._id,
      status: status,
    },
    query: `
      mutation UpdateStatus($_id: ID!, $status: String!) {
        updateStatus(_id: $_id, status: $status) {
          _id
          status
        }
      }
    `
  }).then(res => {
    if (res.data.errors) {
      process.env.NODE_ENV === 'development' && console.log(`UpdateStatus Error: ${res.data.errors[0].message}`)
    } else {
      process.env.NODE_ENV === 'development' && console.log(res)
    }
  }).catch(err => {
    process.env.NODE_ENV === 'development' && console.log(`UpdateStatus Error: ${err}`)
  })
}