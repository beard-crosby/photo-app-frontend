import React, { useContext, useEffect } from 'react'
import { Context } from '../App'
import PhotoCard from '../components/Cards/PhotoCard'
import moment from 'moment'

const Wall = () => { // Render posts of followed users in order of date time.
  const { user, setUser, wall, setWall } = useContext(Context)

  const wallArr = [] // Array of posts to be rendered. This updates every page load.

  useEffect(() => { // If wallArr length is different from wall length in context, setWall(wallArr).
    if (wallArr.length !== wall.length) {
      setWall(wallArr) // From context the wall can then be mutated.
      localStorage.setItem('wall', JSON.stringify(wallArr))
    }
  }, [wallArr, wall, setWall])

  for (let i = 1; i <= 10; i++) { // Populate wallArr with x amount of posts.
    let earliestPost = { created_at: moment().format() }
    if (wallArr.length > 0) earliestPost = wallArr.slice(-1)[0] // Get the created_at of the last element in wall.

    let temp = { created_at: '1000-01-01T00:00:00+01:00' } // Init temp with a date before any other post.

    user.following.forEach(followed => // Loop through all of the users that the user is following.
      followed.posts.forEach(post => { // Loop through all the posts each user has.
        if (moment(post.created_at).isAfter(temp.created_at) && moment(post.created_at).isBefore(earliestPost.created_at)) {
          temp = post
        } 
      })
    )

    user.posts.forEach(post => { // Loop through all of the posts the users has.
      if (moment(post.created_at).isAfter(temp.created_at) && moment(post.created_at).isBefore(earliestPost.created_at)) {
        temp = post
      }
    })

    temp.img && wallArr.push(temp) // If temp obj has an img key, push to wallArr. I.E. don't try and render the temp init data.
  }

  return wall.map((post, i) => <PhotoCard key={i} user={user} setUser={setUser} wall={wall} setWall={setWall} post={post}/>)
}

export default Wall