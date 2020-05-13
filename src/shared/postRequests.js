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
      process.env.NODE_ENV === 'development' && console.log(JSON.parse(res.data.errors[0].message))
      res.data.errors[0].message === '{"auth":"Not Authenticated!"}' && setUser({ ...logout(), redirect: "/loggedout" })
    } else {
      setUser({ ...user, posts: [ ...user.posts, res.data.data.createPost ]})
      history.push("/")
      process.env.NODE_ENV === 'development' && console.log(res)
    }
    setLoading(false)
  }).catch(err => {
    process.env.NODE_ENV === 'development' && console.log(err)
    setLoading(false)
  })
}