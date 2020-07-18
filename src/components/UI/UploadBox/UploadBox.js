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
      setErr(<h2>Duplicate Post!<br/>You have already posted this image.</h2>)
      setThumb("")
    } else if (user.formErrors === "Duplicate Profile Picture!") {
      setErr(<h2>Duplicate Profile Picture!<br/>This is already your Profile Picture.</h2>)
      setThumb("")
    }
  }, [user, setErr])

  useEffect(() => {
    return () => redundantFilesCheck(user, setUser, history)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  let text = <h2>Choose an image<br/>{canDragDrop && `or drag it here`}</h2>

  // Check for all concerning errors/rejections.
  if (acceptedFiles.length > 0 && fileRejections.length > 0) {
    text = <h2>Multiple files<br/>Please select one image</h2>
  } else if (fileRejections.length > 0) {
    switch (fileRejections[0].errors[0].code) {
      case "too-many-files": text = <h2>Multiple files<br/>Please select one image</h2>; break
      case "file-invalid-type": text = <h2>Unsupported file type<br/>Please use JPEG or PNG</h2>; break
      case "file-too-large": text = <h2>File size too large<br/>10MB maximum</h2>; break
      default: text = <h2>Choose an image<br/>{canDragDrop && `or drag it here`}</h2>
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