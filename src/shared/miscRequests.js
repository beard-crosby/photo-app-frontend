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
          email
          website
          tokens
        }
      }
    `
  }, {headers: headers(user.token)}).then(res => {
    if (res.data.errors) {
      checkAuth(res, setUser, history)
      process.env.NODE_ENV === 'development' && console.log(`UpdateSettings Error: ${res.data.errors[0].message}`)
    } else {
      setUser({
        ...user, 
        email: res.data.data.updateSettings.email, 
        website: res.data.data.updateSettings.website, 
        token: useTokens(res.data.data.updateSettings.tokens, user)
      })

      localStorage.setItem('settings', JSON.stringify(user.settings))
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
      status: status,
    },
    query: `
      mutation UpdateStatus($status: String!) {
        updateStatus(status: $status) {
          status
        }
      }
    `
  }, {headers: headers(user.token)}).then(res => {
    if (res.data.errors) {
      process.env.NODE_ENV === 'development' && console.log(`UpdateStatus Error: ${res.data.errors[0].message}`)
    } else {
      process.env.NODE_ENV === 'development' && console.log(res)
    }
  }).catch(err => {
    process.env.NODE_ENV === 'development' && console.log(`UpdateStatus Error: ${err}`)
  })
}