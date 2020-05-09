import React, { useContext, useCallback } from 'react'
import { UserContext } from '../../../App'
import './_UploadBox.scss'
import { Upload } from 'react-feather'
import {useDropzone} from 'react-dropzone';

const UploadBox = () => {
  const { user, setUser } = useContext(UserContext)

  const onDrop = useCallback(files => {
    setUser({ ...user, files: files })
  }, [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps({className: `upload-box ${isDragActive && `drag-active`}`})}>
      <input {...getInputProps()}/>
      <Upload/>
      <h1>Choose an image</h1>
      <h1>or drag it here</h1>
    </div>
  )
}

export default UploadBox