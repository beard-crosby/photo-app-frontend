import axios from "axios"
import { headers } from './utility'
import { logout } from './localStorage'
import { formatFilename } from './utility'

export const signS3 = (file, user, setUser, history) => {
  axios.post('', {
    variables: {
      filename: formatFilename(user.name, file.name),
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
      res.data.errors[0].message === '{"auth":"Not Authenticated!"}' && logout(history)
    } else {
      process.env.NODE_ENV === 'development' && console.log(res)
      uploadToS3(res.data.data.signS3, file, user, setUser)
    }
  }).catch(err => {
    process.env.NODE_ENV === 'development' && console.log(err)
  })
}

const uploadToS3 = (signS3, file, user, setUser) => {
  axios.put(signS3.signedRequest, file, {headers: {"Content-Type": file.type}}).then(res => {
    process.env.NODE_ENV === 'development' && console.log(res)
    setUser({ ...user, file: { url: signS3.url, uploaded: true }})
  }).catch(err => {
    process.env.NODE_ENV === 'development' && console.log(err)
  })
}