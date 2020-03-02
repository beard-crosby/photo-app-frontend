import React, { useContext } from 'react'
import { UserContext } from '../App'
import PhotoCard from '../components/PhotoCard'
import moment from 'moment'

const Following = () => {
  const { user } = useContext(UserContext)
  const photoCardsArr = [] // Array of photoCards to be rendered.

  // Render posts of followed users in order of date time.
  for (let i = 0; i <= 20; i++) { // Do this 20 times.
    let earliestArrDate = { date: moment().format('YYYY-MM-DD HH:mm:ss') } // Get the earliest date in the photoCardsArr.

    photoCardsArr.map(photoCard => {
      if (moment(photoCard.date).isBefore(earliestArrDate.date)) {
        earliestArrDate = photoCard
      }
      return null // get rid of err msg
    })

    let temp = { date: '1800-01-01 00:00:00' }
    user.following.map(followed => // Loop through all the users that the user is following.
      followed.posts.map(post => { // Loop through all the posts each user has.
        if (moment(post.date).isAfter(temp.date) && moment(post.date).isBefore(earliestArrDate.date)) { // If post date is later than the date in temp AND earlier than the date in earliestArrDate,
          temp = { ...post, user: { name: followed.name, username: followed.username, profileImg: followed.profileImg }} // temp = upload && the name and profileImg of the user that made the upload. 
        }
        return null // get rid of err msg
      })
    )

    temp.img && photoCardsArr.push(temp) // If temp obj has an img, push to photoCardsArr. I.E. don't try and render the temp boolean data.
  }

  return (
    <>
      {photoCardsArr.map((photoCard, i) => 
        <PhotoCard
          key={i}
          img={<img alt="Test Img" src={require(`../static/testPictures/${photoCard.img}`)}/>}
          name={photoCard.user.name}
          username={photoCard.user.username}
          profileImg={<img alt="Test Img" src={require(`../static/defaults/${photoCard.user.profileImg}`)}/>}
          comments={photoCard.comments}
        />
      )}
    </>
  )
}

export default Following
