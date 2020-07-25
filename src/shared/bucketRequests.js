import axios from "axios"
import { useTokens, headers, checkAuth, formatFilename, isDuplicatePost, isDuplicateProfilePicture } from './utility'

export const signS3 = (file, user, setUser, history) => {
  const filename = history.location.pathname === "/signedup" || history.location.pathname === "/settings" ? 
  formatFilename(user._id, file.name, "profile-picture/") : 
  formatFilename(user._id, file.name, "")

  if (filename.includes("profile-picture")) {
    if (isDuplicateProfilePicture(user, filename)) {
      return setUser({...user, formErrors: "Duplicate Profile Picture!", file: { uploaded: false }})
    }
  } else {
    if (isDuplicatePost(user, filename)) {
      return setUser({...user, formErrors: "Duplicate Post!", file: { uploaded: false }})
    }
  }

  axios.post('', {
    variables: {
      filename: filename,
      filetype: file.type,
    },
    query: `
      mutation SignS3($filename: String!, $filetype: String!) {
        signS3(filename: $filename, filetype: $filetype) {
          url
          signedRequest
          tokens
        }
      }
    `
  }, {headers: headers(user.token)}).then(res => {
    if (res.data.errors) {
      checkAuth(res, setUser, history)
      process.env.NODE_ENV === 'development' && console.log(`SignS3: ${res.data.errors[0].message}`)
    } else {
      const tokens = res.data.data.signS3.tokens
      tokens && setUser({...user, token: useTokens(tokens, user)})
      uploadToS3(res.data.data.signS3, file, user, setUser)    
      process.env.NODE_ENV === 'development' && console.log(res)
    }
  }).catch(err => {
    process.env.NODE_ENV === 'development' && console.log(`SignS3: ${err}`)
  })
}

const uploadToS3 = (signS3, file, user, setUser) => {
  axios.put(signS3.signedRequest, file, {headers: {"Content-Type": file.type}}).then(res => {
    setUser({...user, file: { url: signS3.url, uploaded: true}})
    process.env.NODE_ENV === 'development' && console.log(res)
  }).catch(err => {
    process.env.NODE_ENV === 'development' && console.log(`UploadToS3: ${err}`)
  })
}

export const redundantFilesCheck = (user, setUser, history) => {
  axios.post('', {
    query: `
      mutation {
        redundantFilesCheck {
          tokens
        }
      }
    `
  }, {headers: headers(user.token)}).then(res => {
    if (res.data.errors) {
      checkAuth(res, setUser, history)
      process.env.NODE_ENV === 'development' && console.log(`RedundantFilesCheck: ${res.data.errors[0].message}`)
    } else {
      const tokens = res.data.data.redundantFilesCheck.tokens
      tokens && setUser({...user, token: useTokens(tokens, user)})
      process.env.NODE_ENV === 'development' && console.log(res)
    }
  }).catch(err => {
    process.env.NODE_ENV === 'development' && console.log(`RedundantFilesCheck: ${err}`)
  })
}