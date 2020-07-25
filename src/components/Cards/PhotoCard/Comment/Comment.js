import React from 'react'
import styles from './_Comment.module.scss'
import ProfilePicture from '../../../UI/ProfilePicture'
import PropTypes from 'prop-types'

const Comment = ({ user, setUser, comment, header, text, history }) => 
  <div className={`${styles.comment} ${comment ? user._id === comment.author._id && styles.noHover : styles.noHover}`}>
    {header ? 
    <p style={{ float: "left", marginRight: 5, color: "black" }}>{header}</p> : 
    <ProfilePicture user={comment.author} setUser={setUser} heightWidth={18} style={{ float: "left", marginRight: 5 }} history={history} disable/>}
    <p className={`${comment && user._id !== comment.author._id && styles.text}`}>{text ? text : comment.comment}</p>
  </div>

Comment.propTypes = {
  user: PropTypes.object.isRequired,    // User context.
  setUser: PropTypes.func.isRequired,   // setUser function from context.
  comment: PropTypes.object,            // Comment object.
  text: PropTypes.string,               // Comment text.
  header: PropTypes.string,             // Replace user img with a string.
  history: PropTypes.object.isRequired, // history object from react-router-dom.
}

export default Comment