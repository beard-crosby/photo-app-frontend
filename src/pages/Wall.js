import React, { useContext } from 'react'
import { UserContext } from '../App'
import PhotoCard from '../components/PhotoCard'
import moment from 'moment'

const Wall = () => {
  const { user } = useContext(UserContext)
  const photoCardsArr = [] // Array of photoCards to be rendered.

  // Render posts of followed users in order of date time.
  for (let i = 0; i <= 9; i++) { // Loop and render 10 photoCards.
    let earliestDate = { created_at: moment().format() }
    if (photoCardsArr.length > 0) {
      earliestDate = photoCardsArr.slice(-1)[0] // Get the created_at of the last element in photoCardsArr.
    }

    let temp = { created_at: '1800-01-01T00:00:00+01:00' }
    user.following.map(followed => // Loop through all the users that the user is following.
      followed.posts.map(post => { // Loop through all the posts each user has.
        if (moment(post.created_at).isAfter(temp.created_at) && moment(post.created_at).isBefore(earliestDate.created_at)) { // If post.created_at is later than temp.created_at AND earlier than earliestDate.created_at.
          temp = { ...post, user: { name: followed.name, username: followed.username, profileImg: followed.profileImg }}
        }
        return null // get rid of err msg
      })
    )

    temp.img && photoCardsArr.push(temp) // If temp obj has an img key, push to photoCardsArr. I.E. don't try and render the temp init data.
  }

  return (
    <>
      {photoCardsArr.map((photoCard, i) => 
        <PhotoCard
          key={i}
          img={<img alt="Test Img" src={photoCard.img}/>}
          name={photoCard.user.name}
          username={photoCard.user.username}
          profileImg={<img alt="Test Img" src={require("../static/defaults/placeholder.png")}/>}
          comments={photoCard.comments}
        />
      )}
    </>
  )
}

export default Wall
