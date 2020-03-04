import React, { useContext } from 'react'
import { UserContext } from '../App'

const NotFound = () => {
  const { user } = useContext(UserContext)
  
  return (
    <h2 style={user.dark_mode && { color: '#EEEEEE' }}>Wups! Page Not Found...</h2>
  )
}

export default NotFound