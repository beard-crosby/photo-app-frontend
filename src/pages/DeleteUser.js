import React, { useContext } from 'react'
import { UserContext } from '../App'
import '../scss/_model.scss'
import Button from '../components/UI/Button'
import { deleteAccount } from '../shared/authRequests'
import { XSquare } from 'react-feather'

const DeleteUser = ({ history }) => {
  const { user, setUser, setLoading } = useContext(UserContext)

  return (
    <div className="model">
      <div className="top">
        <h5>Are you sure?</h5>
        <h5 className="pointer" onClick={() => history.goBack()}>BACK</h5>
      </div>
      <div className="middle">
        <p>You are about to permanently delete your account!</p>
        <Button text="DELETE ACCOUNT" icon={<XSquare/>} onClick={() => deleteAccount(user, setUser, setLoading)}/>
      </div>
    </div>
  )
}

export default DeleteUser