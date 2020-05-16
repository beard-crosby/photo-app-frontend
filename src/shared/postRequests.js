import axios from "axios"
import { headers } from './utility'
import { logout } from './localStorage'

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
          comments {
            _id
          }
        }
      }
    `
  }, { headers: headers(user.token) }).then(res => {
    if (res.data.errors) {
      res.data.errors[0].message === "Not Authenticated!" && setUser({ ...logout(), redirect: "/loggedout" })
      process.env.NODE_ENV === 'development' && console.log(`CreatePost Error: ${res.data.errors[0].message}`)
    } else {
      setUser({ ...user, posts: [ ...user.posts, res.data.data.createPost ], file: { uploaded: false }})
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
          description
          author {
            _id
            name
            profile_picture
          }
        }
      }
    `
  }).then(res => {
    if (res.data.errors) {
      process.env.NODE_ENV === 'development' && console.log(`allPosts Error: ${res.data.errors[0].message}`)
    } else {
      setUser({ ...user, posts: res.data.data.allPosts })
      process.env.NODE_ENV === 'development' && console.log(res)
    }
  }).catch(err => {
    process.env.NODE_ENV === 'development' && console.log(`allPosts Error: ${err}`)
  })
}