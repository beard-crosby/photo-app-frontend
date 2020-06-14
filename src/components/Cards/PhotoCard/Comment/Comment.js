import React from 'react'
import styles from './_Comment.module.scss'
import ProfilePicture from '../../../UI/ProfilePicture'
import PropTypes from 'prop-types'

const Comment = ({ user, text, header }) => 
  <div className={styles.comment}>
    {header ? 
    <p style={{ float: "left", marginRight: 5, color: "black" }}>{header}</p> : 
    <ProfilePicture user={user} heightWidth={18} style={{ float: "left", marginRight: 5 }} disable/>}
    <p>{text}</p>
  </div>

Comment.propTypes = {
  user: PropTypes.object.isRequired, // User Object from context.
  text: PropTypes.string.isRequired, // Comment text.
  header: PropTypes.string,          // Replace user img with a string.
}

export default Comment