import { logout } from './localStorage'
import { updateSettings, updateGeolocation } from './miscRequests'
import moment from "moment"

// Onload = true, check dark-mode in context and switch if needed. Else, switch dark_mode in context and switch in db also.
export const switchDarkMode = (user, setUser, Onload, history) => {
  if (Onload) {
    if (user.settings.dark_mode) {
      document.body.classList.add('dark-mode')
      localStorage.setItem("settings", JSON.stringify({ ...user.settings, dark_mode: true }))
    } else {
      document.body.classList.remove('dark-mode')
      localStorage.setItem("settings", JSON.stringify({ ...user.settings, dark_mode: false }))
    }
  } else {
    setUser({ ...user, settings: { ...user.settings, dark_mode: !user.settings.dark_mode} })
    user.token && updateSettings({ ...user, settings: { ...user.settings, dark_mode: !user.settings.dark_mode} }, setUser, history) // request
  }
}

// If logged in for 1h (3600000ms), then logout().
export const timeout = (user, setUser, history) => {
  setTimeout(() => {
    setUser(logout())
    history.push("/loggedout")
    process.env.NODE_ENV === 'development' && console.log("Token Expired!")
  }, user.token_expiry * 3600000)
}

// Add headers to a request
export const headers = token => {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }
}

// Check Geolocation. If no geolocation data or user has moved update User, update localStorage & update database. 
export const checkGeolocation = (userData, setUser, history) => {
  if ("geolocation" in navigator) {
    return navigator.geolocation.getCurrentPosition(position => {
      const currentGeo = { lat: Number(position.coords.latitude), lon: Number(position.coords.longitude)}
      localStorage.setItem('geolocation', JSON.stringify(currentGeo))
      if (userData.geolocation === null || userData.geolocation.lat !== currentGeo.lat || userData.geolocation.lon !== currentGeo.lon) {
        setUser({...userData, geolocation: currentGeo})
        updateGeolocation(userData, setUser, JSON.stringify(currentGeo), history)
      }
    })
  } else {
    process.env.NODE_ENV === 'development' && console.log("Geolocation Not Available!")
  }
}

// Format name of all files to be uploaded to s3.
export const formatFilename = (user_id, filename, type) => {
  const date = moment().format().toLowerCase().replace(/[^a-z0-9]/g, "-")
  const newFilename = `${user_id}/${type}${date}/${filename.toLowerCase().replace(/[^a-z0-9]/g, "-")}`
  return newFilename
}

// If no authentication, logout and redirect.
export const checkAuth = (res, setUser, history) => {
  if (res.data.errors[0].message === "Not Authenticated!") {
    setUser(logout())
    history.push("/loggedout")
  }
}

// Remove a key: value pair from context.
export const removeKey = (obj, prop) => {
  let {[prop]: omit, ...res} = obj
  return res
}

// On focus increase textarea height to 100px.
export const textareaGrow = e => {
  if (e.target.clientHeight < 100) e.target.style.height = "100px"
}

// Itterate through an array, find the index of the post in that array, if post index === i then change key of that object.
export const newArrObjValue = (arr, post, key, comment, user) => {
  return arr.map((p, i) => { // Find the post and mutate the title.
    if (arr.findIndex(x => x._id === post._id) !== i) {
      return p
    } else {
      if (comment) {
        p.comments.unshift({ 
          author: { 
            _id: user._id, 
            name: user.name, 
            profile_picture: user.profile_picture,
          }, 
          comment: comment,
          created_at: moment().format(),
          updated_at: moment().format(),
        })
        return { ...p, comments: p.comments }
      } else {
        return { ...p, [key]: post[key] }
      }
    }
  })
}

// Check if a file is a duplicate of another in the s3 bucket. Returns true if it is.
// preUpload = if preUpload is passed, perform check with pre-uploaded file.
// isPP = if isPP is true, check for a duplicate profile-picture rather than a post.
export const isDuplicateFile = (user, preUpload, isPP) => {
  let isDuplicate = false
  let newFile = null

  if (preUpload) {
    newFile = preUpload.substring(preUpload.lastIndexOf("/") + 1)
  } else {
    newFile = user.file.url.substring(user.file.url.lastIndexOf("/") + 1)
  }

  if (isPP) {
    const oldFile = user.profile_picture.substring(user.profile_picture.lastIndexOf("/") + 1)
    if (newFile === oldFile) {
      isDuplicate = true
    }
  } else {
    user.posts.forEach(post => {
      const fileInPosts = post.img.substring(post.img.lastIndexOf("/") + 1)
      if (newFile === fileInPosts) {
        isDuplicate = true
      }
    })
  }
  
  return isDuplicate
}