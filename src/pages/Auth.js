import React, { useContext, useState, useEffect } from 'react'
import { Context } from '../App'
import AuthCard from '../components/Cards/AuthCard'
import { posts } from '../shared/postRequests'
import MasonryWrapper from '../components/Masonry/MasonryWrapper'
import ErrorCard from '../components/Cards/ErrorCard'

const Auth = ({ history }) => {
  const { user, setUser, setLoading } = useContext(Context)
  const [ formErrors, setFormErrors ] = useState("")

  useEffect(() => posts(user, setUser, 20, 4), []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    user.formErrors && setFormErrors(user.formErrors)
  }, [user, setUser])

  return (
    <MasonryWrapper user={user}>
      <AuthCard 
        user={user} 
        setUser={setUser} 
        setLoading={setLoading}
        formErrors={formErrors} 
        setFormErrors={setFormErrors} 
        history={history} 
        style={{ width: 343, marginBottom: 7 }}/>
      {formErrors && <ErrorCard formErrors={formErrors} setFormErrors={setFormErrors}/>}
    </MasonryWrapper>
  )
}

export default Auth