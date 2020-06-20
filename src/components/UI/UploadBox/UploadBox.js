import React, { useState, useEffect } from 'react'
import styles from './_UploadBox.module.scss'
import { Upload } from 'react-feather'
import { useDropzone } from 'react-dropzone'
import { signS3, redundantFilesCheck } from '../../../shared/bucketRequests'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

const UploadBox = ({ user, setUser, style, history }) => {
  const [ thumb, setThumb ] = useState("")
  const [ err, setErr ] = useState(null)

  // Determine if the window has drag and drop capabilities.
  const canDragDrop = () => {
    const testDiv = document.createElement('div');
    return (('draggable' in testDiv) || ('ondragstart' in testDiv && 'ondrop' in testDiv)) && 'FormData' in window && 'FileReader' in window;
  }

  // Init the dropzone with the necessary arguments.
  const {acceptedFiles, fileRejections, getRootProps, getInputProps, isDragActive } = useDropzone({ 
    accept: 'image/jpeg, image/png',
    multiple: false,
    maxSize: 10000000,
  })

  // If acceptedFiles has at least one file and there are no fileRejections, set context and thumbnail.
  // Else, nullify user.file context and revert thumbnail state.
  useEffect(() => {
    if (acceptedFiles.length > 0 && fileRejections.length === 0) {
      setThumb(URL.createObjectURL(acceptedFiles[0]))
      signS3(acceptedFiles[0], user, setUser, history)
    } else if (thumb) {
      setUser({ ...user, file: { uploaded: false } })
      setThumb("")
    }
  }, [acceptedFiles]) // eslint-disable-line react-hooks/exhaustive-deps

  // Check for errors duplicate errors.
  useEffect(() => {
    if (user.formErrors === "Duplicate Post!") {
      setErr(<h1>Duplicate Post!<br/>You have already posted this image.</h1>)
      setThumb("")
    } else if (user.formErrors === "Duplicate Profile Picture!") {
      setErr(<h1>Duplicate Profile Picture!<br/>This is already your Profile Picture.</h1>)
      setThumb("")
    }
  }, [user, setErr])

  useEffect(() => {
    return () => redundantFilesCheck(user, setUser, history)
  }, [])

  let text = <h1>Choose an image<br/>{canDragDrop && `or drag it here`}</h1>

  // Check for all concerning errors/rejections.
  if (acceptedFiles.length > 0 && fileRejections.length > 0) {
    text = <h1>Multiple files<br/>Please select one image</h1>
  } else if (fileRejections.length > 0) {
    switch (fileRejections[0].errors[0].code) {
      case "too-many-files": text = <h1>Multiple files<br/>Please select one image</h1>; break
      case "file-invalid-type": text = <h1>Unsupported file type<br/>Please use JPEG or PNG</h1>; break
      case "file-too-large": text = <h1>File size too large<br/>10MB maximum</h1>; break
      default: text = <h1>Choose an image<br/>{canDragDrop && `or drag it here`}</h1>
    }
  } else if (err) {
    text = err
  }

  return (
    <div {...getRootProps({className: `
      ${styles.uploadBox} 
      ${canDragDrop && styles.canDragDrop} 
      ${isDragActive && styles.dragActive} 
      ${thumb !== "" && styles.thumb}`})}
      style={style}>
      <input {...getInputProps()}/>
      {thumb ? 
        <img alt="Thumbnail" src={thumb}/> :
        <>
          <Upload/>
          {text}
        </>}
    </div>
  )
}

UploadBox.propTypes = {
  user: PropTypes.object,  // User Object in context.
  setUser: PropTypes.func, // SetUser function in context.
  style: PropTypes.object, // Pass up style. 
}

export default withRouter(UploadBox)