import React, { useContext, useState, useEffect } from 'react'
import { Context } from '../App'
import { posts } from '../shared/postRequests'
import CreateCard from '../components/Cards/CreateCard'
import MasonryWrapper from '../components/Masonry/MasonryWrapper'
import ErrorCard from '../components/Cards/ErrorCard'

const Splash = ({ history }) => {
  const { user, setUser, setLoading } = useContext(Context)
  const [ formErrors, setFormErrors ] = useState("")

  useEffect(() => posts(user, setUser, 20, 4), []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    user.formErrors && user.formErrors !== "oAuth Login" && setFormErrors(user.formErrors)
  }, [user, setUser])

  return (
    <MasonryWrapper user={user}>
      <CreateCard 
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

export default Splash