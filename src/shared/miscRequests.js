import axios from 'axios'
import { headers, checkAuth, useTokens } from './utility'

export const updateSettings = (user, setUser, history) => {
  axios.post('', {
    variables: {
      settings: JSON.stringify(user.settings),
    },
    query: `
      mutation UpdateSettings($settings: String!) {
        updateSettings(settings: $settings) {
          tokens
        }
      }
    `
  }, {headers: headers(user.token)}).then(res => {
    if (res.data.errors) {
      checkAuth(res, setUser, history)
      process.env.NODE_ENV === 'development' && console.log(`UpdateSettings Error: ${res.data.errors[0].message}`)
    } else {
      const tokens = res.data.data.updateSettings.tokens
      tokens && setUser({...user, token: useTokens(tokens, user)})
      process.env.NODE_ENV === 'development' && console.log(res)
    }
  }).catch(err => {
    process.env.NODE_ENV === 'development' && console.log(`UpdateSettings Error: ${err}`)
  })
}

export const updateGeolocation = (user, setUser, geolocation, history) => {
  axios.post('', {
    variables: {
      geo: geolocation,
    },
    query: `
      mutation UpdateGeolocation($geo: String!) {
        updateGeolocation(geolocation: $geo) {
          tokens
        }
      }
    `
  }, {headers: headers(user.token)}).then(res => {
    if (res.data.errors) {
      checkAuth(res, setUser, history)
      process.env.NODE_ENV === 'development' && console.log(`UpdateGeolocation Error: ${res.data.errors[0].message}`)
    } else {
      const tokens = res.data.data.updateGeolocation.tokens
      tokens && setUser({...user, token: useTokens(tokens, user)})
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