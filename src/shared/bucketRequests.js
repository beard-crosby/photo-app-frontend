import axios from "axios"
import { headers, checkAuth, formatFilename, isDuplicatePost } from './utility'

export const signS3 = (file, user, setUser, history) => {
  axios.post('', {
    variables: {
      filename: history.location.pathname === "/changepp" ? 
        formatFilename(user._id, file.name, "profile-picture/") : 
        formatFilename(user._id, file.name, ""),
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
      checkAuth(res, setUser, history)
      process.env.NODE_ENV === 'development' && console.log(`SignS3 Error: ${res.data.errors[0].message}`)
    } else {
      if (isDuplicatePost(user, res.data.data.signS3.url)) {
        return setUser({...user, formErrors: "Duplicate Post!", file: { uploaded: false }})
      }
      uploadToS3(res.data.data.signS3, file, user, setUser)
      process.env.NODE_ENV === 'development' && console.log(res)
    }
  }).catch(err => {
    process.env.NODE_ENV === 'development' && console.log(`SignS3 Error: ${err}`)
  })
}

const uploadToS3 = (signS3, file, user, setUser) => {
  axios.put(signS3.signedRequest, file, {headers: {"Content-Type": file.type}}).then(res => {
    process.env.NODE_ENV === 'development' && console.log(res)
    setUser({ ...user, file: { url: signS3.url, uploaded: true }})
  }).catch(err => {
    process.env.NODE_ENV === 'development' && console.log(`UploadToS3 Error: ${err}`)
  })
}