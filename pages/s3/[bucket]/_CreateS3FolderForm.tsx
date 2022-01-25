import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  DialogTitle,
} from "@material-ui/core"
import { ChangeEvent, useState, FormEvent } from "react"

import { CreateS3FolderApiRequest } from "../../../interfaces/s3"

type Props = {
  open: boolean
  closeHandler: Function
  bucketName: string
  prefix: string
}

const CreateS3FolderFormDialog = (props:Props) => {
  const [folderName, setFolderName] = useState('')
  const [error, setError] = useState('')
  const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case 'folder-name':
        setError('')
        setFolderName(event.target.value);
        break;
      default:
        break
    }
  }
  const handleSubmit = async () => {
    const requestBody:CreateS3FolderApiRequest = {
      bucketName: props.bucketName,
      prefix: props.prefix,
      folderName: folderName
    }
    const response = await fetch('/api/s3/new/folder', {
      'method': 'POST',
      'body': JSON.stringify(requestBody)
    })
    if (response.ok) {
      props.closeHandler()
    } else {
      const responseBody = await response.json()
      setError(responseBody.message)
    }
  }
  const formSubmit = (event:FormEvent) => {
    event.preventDefault()
    handleSubmit()
  }

  return (
    <Dialog open={props.open}>
      <DialogTitle>フォルダー作成</DialogTitle>
      <DialogContent>
        <form onSubmit={formSubmit}>
          <input autoFocus name='folder-name' onChange={handleChange} />
          <p>{error}</p>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.closeHandler()}>キャンセル</Button>
        <Button color='primary' onClick={handleSubmit}>作成</Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateS3FolderFormDialog