import axios from "axios"
import { headers, checkAuth } from './utility'

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
      process.env.NODE_ENV === 'development' && console.log(`CreatePost Error: ${res.data.errors[0].message}`)
    } else {
      setUser({ 
        ...user, 
        posts: [ ...user.posts, res.data.data.createPost ], 
        file: { ...res.data.data.createPost, uploaded: false },
      })
      localStorage.setItem('posts', JSON.stringify([ ...user.posts, res.data.data.createPost ]))
      history.push("/")
      process.env.NODE_ENV === 'development' && console.log(res)
    }
    setLoading(false)
  }).catch(err => {
    setUser({ ...user, file: { uploaded: false }})
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

export const updateTitle = (post, user, setUser, history) => {
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
      process.env.NODE_ENV === 'development' && console.log(`UpdateTitle Error: ${res.data.errors[0].message}`)
    } else {
      const i = user.posts.findIndex(x => x._id === post._id)
      setUser({ ...user, posts: [ ...user.posts, user.posts[i].title = post.title ]})
      localStorage.setItem('posts', JSON.stringify([ ...user.posts, user.posts[i].title = post.title ]))
      process.env.NODE_ENV === 'development' && console.log(res)
    }
  }).catch(err => {
    process.env.NODE_ENV === 'development' && console.log(`UpdateTitle Error: ${err}`)
  })
}

export const updateDescription = (post, user, setUser, history) => {
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
      process.env.NODE_ENV === 'development' && console.log(`UpdateDescription Error: ${res.data.errors[0].message}`)
    } else {
      const i = user.posts.findIndex(x => x._id === post._id)
      setUser({ ...user, posts: [ ...user.posts, user.posts[i].description = post.description ]})
      localStorage.setItem('posts', JSON.stringify([ ...user.posts, user.posts[i].description = post.description ]))
      process.env.NODE_ENV === 'development' && console.log(res)
    }
  }).catch(err => {
    process.env.NODE_ENV === 'development' && console.log(`UpdateDescription Error: ${err}`)
  })
}