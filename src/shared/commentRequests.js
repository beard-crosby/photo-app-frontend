import axios from "axios"
import { useTokens, headers, checkAuth, removeKey, newArrObjValue } from './utility'

export const createComment = (user, setUser, wall, setWall, post, comment, setComment, input, history) => {
  axios.post('', {
    variables: {
      post: post._id,
      comment: comment,
    },
    query: `
      mutation CreateComment($post: ID!, $comment: String!) {
        createComment(post: $post, comment: $comment) {
          tokens
        }
      }
    `
  }, {headers: headers(user.token)}).then(res => {
    if (res.data.errors) {
      checkAuth(res, setUser, history)
      setUser({...user, formErrors: res.data.errors[0].message})
      process.env.NODE_ENV === 'development' && console.log(`CreateComment: ${res.data.errors[0].message}`)
    } else {
      const tokens = res.data.data.createComment.tokens
      tokens && setUser({...user, token: useTokens(tokens, user)})
      const newWall = newArrObjValue(wall, post, null, comment, user)
      setWall(newWall)
      localStorage.setItem('wall', JSON.stringify(newWall))
      user.favourites.forEach(fav => {
        if (fav._id === post._id) {
          const newFavs = newArrObjValue(user.favourites, post, null, comment, user)
          setUser({...removeKey(user, "formErrors"), favourites: newFavs})
          localStorage.setItem('favourites', JSON.stringify(newFavs))
        }
      })      
      setComment("")
      input.blur()
      process.env.NODE_ENV === 'development' && console.log(res)
    }
  }).catch(err => {
    process.env.NODE_ENV === 'development' && console.log(`CreateComment: ${err.response.data.errors[0].message}`)
    setUser({...user, formErrors: err.response.data.errors[0].message})
  })
}