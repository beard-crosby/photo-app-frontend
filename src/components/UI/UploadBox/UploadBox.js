import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../../App'
import './_UploadBox.scss'
import { Upload } from 'react-feather'
import {useDropzone} from 'react-dropzone';
import { signS3 } from '../../../shared/bucketRequests'

const UploadBox = () => {
  const { user, setUser } = useContext(UserContext)
  const [ thumb, setThumb ] = useState("")

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
      setUser({ ...user, file: acceptedFiles[0] })
      setThumb(URL.createObjectURL(acceptedFiles[0]))
      signS3(acceptedFiles[0], user, setUser)
    } else {
      setUser({ ...user, file: { uploaded: false } })
      setThumb("")
    }
  }, [acceptedFiles])

  let text = <h1>Choose an image<br/>{canDragDrop && `or drag it here`}</h1>

  // Check for all concerning errors/rejections.
  if (acceptedFiles.length > 0 && fileRejections.length > 0) {
    text = <h1>Multiple files<br/>Please select one image</h1>
  } else if (fileRejections.length > 0) {
    switch (fileRejections[0].errors[0].code) {
      case "too-many-files": 
        text = <h1>Multiple files<br/>Please select one image</h1>
        break
      case "file-invalid-type":
        text = <h1>Unsupported file type<br/>Please use JPEG or PNG</h1>
        break
      case "file-too-large":
        text = <h1>File size too large<br/>10MB maximum</h1>
        break
      default:
        text = <h1>Choose an image<br/>{canDragDrop && `or drag it here`}</h1>
    }
  }

  return (
    <div {...getRootProps({className: `upload-box 
      ${canDragDrop && `can-drag-drop`} 
      ${isDragActive && `drag-active`} 
      ${thumb !== "" && `thumb`}`})}>
      <input {...getInputProps()}/>
      {thumb ? 
        <img src={thumb}/> :
        <>
          <Upload/>
          {text}
        </>}
    </div>
  )
}

export default UploadBox