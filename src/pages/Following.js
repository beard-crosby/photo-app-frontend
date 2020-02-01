import React, { useContext } from 'react'
import { UserContext } from '../App'
import PhotoCard from '../components/PhotoCard'
import moment from 'moment'

const Following = () => {
  const { user } = useContext(UserContext)
  const photoCardsArr = [] // Array of photoCards to be rendered.

  // Render uploads of followed users in order of date time.
  for (let i = 0; i <= 20; i++) { // Do this 20 times.
    let earliestArrDate = { date: moment().format('YYYY-MM-DD HH:mm:ss') } // Get the earliest date in the photoCardsArr.

    photoCardsArr.map(photoCard => {
      if (moment(photoCard.date).isBefore(earliestArrDate.date)) {
        earliestArrDate = photoCard
      }
    })

    let temp = { date: '1800-01-01 00:00:00' }
    user.following.map(followed => // Loop through all the users that the user is following.
      followed.uploads.map(upload => { // Loop through all the uploads each user has.
        if (moment(upload.date).isAfter(temp.date) && moment(upload.date).isBefore(earliestArrDate.date)) { // If upload date is later than the date in temp AND earlier than the date in earliestArrDate,
          temp = { ...upload, user: { name: followed.name, username: followed.username, profileImg: followed.profileImg }} // temp = upload && the name and profileImg of the user that made the upload. 
        }
      })
    )

    temp.img && photoCardsArr.push(temp) // If temp obj has an img, push to photoCardsArr. I.E. don't try and render the temp boolean data.
  }

  return (
    <>
      {photoCardsArr.map((upload, i) => 
        <PhotoCard
          key={i}
          img={<img alt="Test Img" src={require(`../static/testPictures/${upload.img}`)}/>}
          name={upload.user.name}
          username={upload.user.username}
          profileImg={<img alt="Test Img" src={require(`../static/defaults/${upload.user.profileImg}`)}/>}
          comments={upload.comments}
        />
      )}
    </>
  )
}

export default Following
