import axios from "axios"
import { useTokens, headers, checkAuth, removeKey, newArrObjValue, isDuplicatePost } from './utility'

export const createPost = (form, user, setUser, wall, setWall, setLoading, history) => {
  if (isDuplicatePost(user, user.file.url)) {
    return setUser({...user, formErrors: "Duplicate Post!", file: { uploaded: false }})
  }

  setLoading(true)
  axios.post('', {
    variables: {
      img: user.file.url,
      title: form.title,
      description: form.description,
      author: user._id,
    },
    query: `
      mutation CreatePost($img: String!, $title: String!, $description: String!, $author: ID!) {
        createPost(postInput: { img: $img, title: $title, description: $description, author: $author }) {
          _id
          tokens
          img
          title
          description
          created_at
          updated_at
          author {
            _id
            name
            email
            website
            profile_picture
          }
          comments {
            _id
            comment
            created_at
            updated_at
            author {
              _id
            }
          }
        }
      }
    `
  }, {headers: headers(user.token)}).then(res => {
    if (res.data.errors) {
      checkAuth(res, setUser, history)
      setUser({...user, formErrors: res.data.errors[0].message})
      process.env.NODE_ENV === 'development' && console.log(`CreatePost: ${res.data.errors[0].message}`)
    } else {
      process.env.NODE_ENV === 'development' && console.log(res)
      setUser({
        ...removeKey(user, "formErrors"), 
        token: useTokens(res.data.data.createPost.tokens, user),
        posts: [ ...user.posts, res.data.data.createPost ], 
        file: { uploaded: false },
      })
      setWall([ res.data.data.createPost, ...wall.slice(0, -1) ])
      localStorage.setItem('posts', JSON.stringify([ ...user.posts, res.data.data.createPost ]))
      localStorage.setItem('wall', JSON.stringify([ res.data.data.createPost, ...wall.slice(0, -1) ]))
      history.push("/")
    } 
    setLoading(false)
  }).catch(err => {
    setUser({...user, formErrors: err.response.data.errors[0].message, file: { uploaded: false }})
    process.env.NODE_ENV === 'development' && console.log(`CreatePost: ${err.response.data.errors[0].message}`)
    setLoading(false)
  })
}

export const allPosts = (user, setUser) => {
  axios.post('', {
    query: `
      query {
        allPosts {
          _id
          img
          title
        }
      }
    `
  }).then(res => {
    if (res.data.errors) {
      process.env.NODE_ENV === 'development' && console.log(`allPosts: ${res.data.errors[0].message}`)
    } else {
      setUser({ settings: user.settings, allPosts: res.data.data.allPosts })
      process.env.NODE_ENV === 'development' && console.log(res)
    }
  }).catch(err => {
    process.env.NODE_ENV === 'development' && console.log(`allPosts: ${err.response.data.errors[0].message}`)
  })
}

export const updateTitle = (post, user, setUser, wall, setWall, setSpinner, setOverlay, history) => {
  setSpinner(true) // NOT spinner in context. useState in PhotoCard.
  const newPosts = newArrObjValue(user.posts, post, "title")
  const newWall = newArrObjValue(wall, post, "title")

  axios.post('', {
    variables: {
      _id: post._id,
      title: post.title,
    },
    query: `
      mutation UpdateTitle($_id: ID!, $title: String!) {
        updateTitle(_id: $_id, title: $title) {
          tokens
        }
      }
    `
  }, {headers: headers(user.token)}).then(res => {
    if (res.data.errors) {
      checkAuth(res, setUser, history)
      setUser({...user, posts: newPosts, formErrors: res.data.errors[0].message})
      process.env.NODE_ENV === 'development' && console.log(`UpdateTitle: ${res.data.errors[0].message}`)
    } else {
      user.postClicked ? 
      setUser({
        ...removeKey(user, "formErrors"),
        token: useTokens(res.data.data.updateTitle.tokens, user),
        posts: newPosts, 
        postClicked: post,
      }) :
      setUser({
        ...removeKey(user, "formErrors"), 
        token: useTokens(res.data.data.updateTitle.tokens, user),
        posts: newPosts,
      })
      setWall(newWall)
      localStorage.setItem('posts', JSON.stringify(newPosts))
      localStorage.setItem('wall', JSON.stringify(newWall))
      setOverlay(null)
      process.env.NODE_ENV === 'development' && console.log(res)
    }
    setSpinner(false)
  }).catch(err => {
    setUser({...user, posts: newPosts, formErrors: err.response.data.errors[0].message})
    process.env.NODE_ENV === 'development' && console.log(`UpdateTitle: ${err.response.data.errors[0].message}`)
    setSpinner(false)
  })
}

export const updateDescription = (post, user, setUser, wall, setWall, setSpinner, setOverlay, title, history) => {
  setSpinner(true) // NOT spinner in context. useState in PhotoCard.
  const newPosts = newArrObjValue(user.posts, post, "description")
  const newWall = newArrObjValue(wall, post, "description")

  axios.post('', {
    variables: {
      _id: post._id,
      description: post.description,
    },
    query: `
      mutation UpdateDescription($_id: ID!, $description: String!) {
        updateDescription(_id: $_id, description: $description) {
          tokens
        }
      }
    `
  }, {headers: headers(user.token)}).then(res => {
    if (res.data.errors) {
      checkAuth(res, setUser, history)
      setUser({...user, posts: newPosts, formErrors: res.data.errors[0].message})
      process.env.NODE_ENV === 'development' && console.log(`UpdateDescription: ${res.data.errors[0].message}`)
    } else {
      user.postClicked ? 
      setUser({
        ...title.length === 0 ? user : removeKey(user, "formErrors"),
        token: useTokens(res.data.data.updateDescription.tokens, user), 
        posts: newPosts, 
        postClicked: post,
      }) :
      setUser({
        ...title.length === 0 ? user : removeKey(user, "formErrors"),
        token: useTokens(res.data.data.updateDescription.tokens, user), 
        posts: newPosts,
      })
      setWall(newWall)
      localStorage.setItem('posts', JSON.stringify(newPosts))
      localStorage.setItem('wall', JSON.stringify(newWall))
      title.length > 0 && setOverlay(null)
      process.env.NODE_ENV === 'development' && console.log(res)
    }
    setSpinner(false)
  }).catch(err => {
    setUser({...user, posts: newPosts, formErrors: err.response.data.errors[0].message})
    process.env.NODE_ENV === 'development' && console.log(`UpdateDescription: ${err.response.data.errors[0].message}`)
    setSpinner(false)
  })
}

export const deletePost = (post, user, setUser, wall, setWall, setOverlay, setSpinner, history) => {
  setSpinner(true) // NOT spinner in context. useState in PhotoCard.

  axios.post('', {
    variables: {
      _id: post._id
    },
    query: `
      mutation DeletePost($_id: ID!) {
        deletePost(_id: $_id) {
          tokens
        }
      }
    `
  }, {headers: headers(user.token)}).then(res => {
    if (res.data.errors) {
      checkAuth(res, setUser, history)
      process.env.NODE_ENV === 'development' && console.log(`DeletePost: ${res.data.errors[0].message}`)
    } else {
      const newPosts = user.posts.filter(x => x._id !== post._id)
      const newWall = wall.filter(x => x._id !== post._id)
      setUser({
        ...removeKey(user, "postClicked"),
        token: useTokens(res.data.data.deletePost.tokens, user),
        posts: newPosts,
      })
      setWall(newWall)
      localStorage.setItem('posts', JSON.stringify(newPosts))
      localStorage.setItem('wall', JSON.stringify(newWall))
      setOverlay(null)
      process.env.NODE_ENV === 'development' && console.log(res)
    }
    setSpinner(false)
  }).catch(err => {
    process.env.NODE_ENV === 'development' && console.log(`DeletePost: ${err.response.data.errors[0].message}`)
    setSpinner(false)
  })
}