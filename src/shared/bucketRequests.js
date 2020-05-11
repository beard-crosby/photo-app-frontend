import axios from "axios"
import { headers } from './utility'
import { logout } from './localStorage'
import { formatFilename } from './utility'

export const signS3 = (file, user, setUser) => {
  axios.post('', {
    variables: {
      filename: formatFilename(file.name),
      filetype: file.type,
    },
    query: `
      mutation ($filename: String!, $filetype: String!) {
        signS3 (filename: $filename, filetype: $filetype) {
          url
          signedRequest
        }
      }
    `
  }, { headers: headers(user.token) }).then(res => {
    if (res.data.errors) {
      process.env.NODE_ENV === 'development' && console.log(JSON.parse(res.data.errors[0].message))
      res.data.errors[0].message === '{"auth":"Not Authenticated!"}' && logout()
    } else {
      process.env.NODE_ENV === 'development' && console.log(res)
      uploadToS3(res.data.data.signS3.signedRequest, file, user, setUser)
    }
  }).catch(err => {
    process.env.NODE_ENV === 'development' && console.log(err)
  })
}

const uploadToS3 = (signedRequest, file, user, setUser) => {
  axios.put(signedRequest, file, {headers: {"Content-Type": file.type}}).then(res => {
    process.env.NODE_ENV === 'development' && console.log(res)
    setUser({ ...user, file: res.config.url })
  }).catch(err => {
    process.env.NODE_ENV === 'development' && console.log(err)
  })
}