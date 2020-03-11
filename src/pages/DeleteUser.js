import React, { useContext } from 'react'
import { UserContext } from '../App'
import '../scss/_model.scss'
import Button from '../components/UI/Button'
import { deleteAccount } from '../shared/authRequests'

const DeleteUser = ({ history }) => {
  const { user, setUser, setLoading } = useContext(UserContext)

  return (
    <div className="model">
      <div className="top">
        <h4>Are you sure?</h4>
        <h5 className="pointer" onClick={() => history.goBack()}>BACK</h5>
      </div>
      <div className="middle">
        <p>You are about to permanently delete your account!</p>
      </div>
      <div className="bottom" style={{ justifyContent: 'center' }}>
        <Button 
          text="DELETE ACCOUNT" 
          onClick={() => deleteAccount(user._id, history, setUser, setLoading, user.token)}/>
      </div>
    </div>
  )
}

export default DeleteUser