import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../App'
import { Link } from 'react-router-dom'
import '../scss/_model.scss'
import Button from '../components/UI/Button'
import UploadBox from '../components/UI/UploadBox'
import FormSection from '../components/UI/FormSection'
import { createPost } from '../shared/postRequests'
import { Upload } from 'react-feather'

const Post = ({ history }) => {
  const { user, setUser, setLoading } = useContext(UserContext)
  const [ formValid, setFormValid ] = useState(false)
  const [ form, setForm ] = useState({
    title: "",
    description: "",
  })

  useEffect(() => {
    form.title.length > 0 && user.file.uploaded && setFormValid(true)
  }, [user, form])

  const onPostClicked = event => {
    event.preventDefault()
    createPost(form, user, setUser, setLoading, history)
  }

  const descriptionHeight = () => {
    let textarea = document.getElementById("description")
    if (textarea.clientHeight < 100) textarea.style.height = "100px"
  }
  
  return (
    <>
      <form className="model" onSubmit={event => onPostClicked(event)} style={{ width: 450 }}>
        <div className="top">
          <h5 className="title">CREATE A POST</h5>
          <h5 onClick={() => history.goBack()}>BACK</h5>
        </div>
        <div className="middle">
          <FormSection text={"Title"} user={user} form={form} setForm={setForm}/>
          <FormSection text={"Description"} user={user} form={form} setForm={setForm} onMouseDown={() => descriptionHeight()} textarea/>
          <UploadBox user={user} setUser={setUser} style={{ margin: "20px 0"}}/>
          <Button submit disabled={!formValid} icon={<Upload/>} text="Post"/>
        </div>
      </form>
      <Link className="below" to="/termsandconditions"><h6>Terms and Conditions</h6></Link>
    </>
  )
}

export default Post