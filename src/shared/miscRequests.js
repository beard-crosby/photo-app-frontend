import axios from 'axios'
import { headers } from './utility'

export const changeDarkMode = (_id, token) => {
  axios.post('', {
    variables: {
      _id: _id
    },
    query: `
      mutation SetDarkMode($_id: ID!) {
        setDarkMode(_id: $_id) {
          dark_mode
        }
      }
    `
  }, { headers: headers(token) }).then(res => {
    if (res.data.errors) {
      process.env.NODE_ENV === 'development' && console.log(`Error: ${res.data.errors[0].message}`)
    } else {
      process.env.NODE_ENV === 'development' && console.log(res)
    }
  }).catch(err => {
    process.env.NODE_ENV === 'development' && console.log(err)
  })
}

export const updateGeolocation = (_id, geolocation, token) => {
  axios.post('', {
    variables: {
      _id: _id,
      geo: geolocation
    },
    query: `
      mutation UpdateGeolocation($_id: ID!, $geo: String!) {
        updateGeolocation(_id: $_id, geolocation: $geo) {
          geolocation
        }
      }
    `
  }, { headers: headers(token) }).then(res => {
    if (res.data.errors) {
      process.env.NODE_ENV === 'development' && console.log(`Error: ${res.data.errors[0].message}`)
    } else {
      process.env.NODE_ENV === 'development' && console.log(res)
    }
  }).catch(err => {
    process.env.NODE_ENV === 'development' && console.log(err)
  })
}