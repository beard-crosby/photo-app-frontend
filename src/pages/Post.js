import React, { useState, useContext, useEffect } from 'react'
import { Context } from '../App'
import { Link } from 'react-router-dom'
import '../scss/_model.scss'
import { textareaGrow, removeKey } from '../shared/utility'
import Button from '../components/UI/Button'
import UploadBox from '../components/UI/UploadBox'
import FormSection from '../components/UI/FormSection'
import { createPost } from '../shared/postRequests'
import { Upload } from 'react-feather'

const Post = ({ history }) => {
  const { user, setUser, wall, setWall, setLoading } = useContext(Context)
  const [ formValid, setFormValid ] = useState(false)
  const [ form, setForm ] = useState({
    title: "",
    description: "",
  })

  useEffect(() => {
    form.title.length > 0 && user.file.uploaded && setFormValid(true)
    return () => user.formErrors && setUser(removeKey(user, "formErrors"))
  }, [user, setUser, form])

  const onPostClicked = event => {
    event.preventDefault()
    createPost(form, user, setUser, wall, setWall, setLoading, history)
  }
  
  return (
    <>
      <form className="model" onSubmit={event => onPostClicked(event)}>
        <div className="top">
          <h5 className="title">CREATE A POST</h5>
          <h5 onClick={() => history.goBack()}>BACK</h5>
        </div>
        <div className="middle">
          <FormSection text={"Title"} user={user} form={form} maxLength="60" setForm={setForm}/>
          <FormSection text={"Description"} user={user} form={form} setForm={setForm} onFocus={e => textareaGrow(e)} maxLength="300" textarea/>
          <UploadBox user={user} setUser={setUser} style={{ margin: "20px 0"}}/>
          <Button submit disabled={!formValid} icon={<Upload/>} text="Post"/>
        </div>
      </form>
      <Link className="below" to="/termsandconditions"><h6>Terms and Conditions</h6></Link>
    </>
  )
}

export default Post