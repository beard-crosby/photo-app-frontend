import React, { useContext, useEffect } from 'react'
import { UserContext } from '../App'
import PhotoCard from '../components/Cards/PhotoCard'
import moment from 'moment'
import { removeKey } from '../shared/utility'

const Wall = () => {
  const { user, setUser } = useContext(UserContext)
  useEffect(() => user.formErrors && setUser(removeKey(user, "formErrors")), []) // eslint-disable-line react-hooks/exhaustive-deps
  
  const photoCardsArr = [] // Array of photoCards to be rendered.

  // Render posts of followed users in order of date time.
  for (let i = 0; i <= 9; i++) { // Loop and render 10 photoCards.
    let earliestPost = { created_at: moment().format() }
    if (photoCardsArr.length > 0) {
      earliestPost = photoCardsArr.slice(-1)[0] // Get the created_at of the last element in photoCardsArr.
    }

    let temp = { created_at: '1800-01-01T00:00:00+01:00' }

    user.following.map(followed => // Loop through all of the users that the user is following and then loop through all the posts that user has.
      followed.posts.map(post => { // eslint-disable-line array-callback-return 
        if (moment(post.created_at).isAfter(temp.created_at) && moment(post.created_at).isBefore(earliestPost.created_at)) { // If post.created_at is later than temp.created_at AND earlier than earliestDate.created_at.
          temp = post
        } 
      })
    )

    user.posts.map(post => { // eslint-disable-line array-callback-return 
      if (moment(post.created_at).isAfter(temp.created_at) && moment(post.created_at).isBefore(earliestPost.created_at)) {
        temp = post
      }
    })

    temp.img && photoCardsArr.push(temp) // If temp obj has an img key, push to photoCardsArr. I.E. don't try and render the temp init data.
  }

  if (user.file._id && photoCardsArr.length > 0) { // When user posts an image and redirects here, make sure the post is a the top of the wall.
    user.file._id !== photoCardsArr[0]._id && photoCardsArr.unshift(user.file)
  } else if (user.file._id) {
    photoCardsArr.unshift(user.file)
  }
  
  return (
    photoCardsArr.map((post, i) => 
      <PhotoCard 
        key={i} 
        user={user}
        setUser={setUser}
        post={post}/>
    )
  )
}

export default Wall