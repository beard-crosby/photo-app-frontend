import axios from "axios"
import { headers, checkAuth, removeKey } from './utility'

export const createPost = (form, user, setUser, setLoading, history) => {
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
      process.env.NODE_ENV === 'development' && console.log(`CreatePost Error: ${res.data.errors[0].message}`)
    } else {
      setUser({ 
        ...removeKey(user, "formErrors"), 
        posts: [ ...user.posts, res.data.data.createPost ], 
        file: { ...res.data.data.createPost, uploaded: false },
      })
      localStorage.setItem('posts', JSON.stringify([ ...user.posts, res.data.data.createPost ]))
      history.push("/")
      process.env.NODE_ENV === 'development' && console.log(res)
    }
    setLoading(false)
  }).catch(err => {
    setUser({ ...user, formErrors: err.response.data.errors[0].message, file: { uploaded: false }})
    process.env.NODE_ENV === 'development' && console.log(`CreatePost Error: ${err}`)
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
      process.env.NODE_ENV === 'development' && console.log(`allPosts Error: ${res.data.errors[0].message}`)
    } else {
      setUser({ settings: user.settings, allPosts: res.data.data.allPosts })
      process.env.NODE_ENV === 'development' && console.log(res)
    }
  }).catch(err => {
    process.env.NODE_ENV === 'development' && console.log(`allPosts Error: ${err}`)
  })
}

export const updateTitle = (post, user, setUser, setSpinner, switchEditDel, history) => {
  setSpinner(true) // NOT spinner in context. UseState in PhotoCard.
  const newPosts = user.posts.map((p, i) => { // Find the post and mutate the title.
    if (user.posts.findIndex(x => x._id === post._id) !== i) {
      return p
    } else {
      return { ...p, title: post.title }
    }
  })

  axios.post('', {
    variables: {
      _id: post._id,
      title: post.title,
    },
    query: `
      mutation UpdateTitle($_id: ID!, $title: String!) {
        updateTitle(_id: $_id, title: $title) {
          title
        }
      }
    `
  }, {headers: headers(user.token)}).then(res => {
    if (res.data.errors) {
      checkAuth(res, setUser, history)
      setUser({...user, posts: newPosts, formErrors: res.data.errors[0].message})
      process.env.NODE_ENV === 'development' && console.log(`UpdateTitle Error: ${res.data.errors[0].message}`)
    } else {
      setUser({ ...removeKey(user, "formErrors"), posts: newPosts })
      localStorage.setItem('posts', JSON.stringify(newPosts))
      switchEditDel(false)
      process.env.NODE_ENV === 'development' && console.log(res)
    }
    setSpinner(false)
  }).catch(err => {
    setUser({ ...user, posts: newPosts, formErrors: err.response.data.errors[0].message})
    process.env.NODE_ENV === 'development' && console.log(`UpdateTitle Error: ${err}`)
    setSpinner(false)
  })
}

export const updateDescription = (post, user, setUser, setSpinner, switchEditDel, history) => {
  setSpinner(true) // NOT spinner in context. UseState in PhotoCard.
  const newPosts = user.posts.map((p, i) => { // Find the post and mutate the description.
    if (user.posts.findIndex(x => x._id === post._id) !== i) {
      return p
    } else {
      return { ...p, description: post.description }
    }
  })
  
  axios.post('', {
    variables: {
      _id: post._id,
      description: post.description,
    },
    query: `
      mutation UpdateDescription($_id: ID!, $description: String!) {
        updateDescription(_id: $_id, description: $description) {
          description
        }
      }
    `
  }, {headers: headers(user.token)}).then(res => {
    if (res.data.errors) {
      checkAuth(res, setUser, history)
      setUser({...user, posts: newPosts, formErrors: res.data.errors[0].message})
      process.env.NODE_ENV === 'development' && console.log(`UpdateDescription Error: ${res.data.errors[0].message}`)
    } else {
      setUser({ ...removeKey(user, "formErrors"), posts: newPosts })
      localStorage.setItem('posts', JSON.stringify(newPosts))
      switchEditDel(false)
      process.env.NODE_ENV === 'development' && console.log(res)
    }
    setSpinner(false)
  }).catch(err => {
    setUser({ ...user, posts: newPosts, formErrors: err.response.data.errors[0].message})
    process.env.NODE_ENV === 'development' && console.log(`UpdateDescription Error: ${err}`)
    setSpinner(false)
  })
}

export const deletePost = (post, user, setUser, history, setDel) => {
  axios.post('', {
    variables: {
      _id: post._id
    },
    query: `
      mutation DeletePost($_id: ID!) {
        deletePost(_id: $_id) {
          _id
        }
      }
    `
  }, {headers: headers(user.token)}).then(res => {
    if (res.data.errors) {
      checkAuth(res, setUser, history)
      process.env.NODE_ENV === 'development' && console.log(`DeletePost Error: ${res.data.errors[0].message}`)
    } else {
      setDel(false)
      const newPosts = user.posts.filter(x => x._id !== post._id)
      setUser({ ...removeKey(user, "postClicked"), posts: newPosts })
      localStorage.setItem('posts', JSON.stringify(newPosts))
      process.env.NODE_ENV === 'development' && console.log(res)
    }
  }).catch(err => {
    process.env.NODE_ENV === 'development' && console.log(`DeletePost Error: ${err}`)
  })
}