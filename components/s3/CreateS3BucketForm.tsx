import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  DialogTitle,
} from "@material-ui/core"
import { ChangeEvent, MouseEventHandler, useState } from "react"

import { S3Bucket } from "../../interfaces/s3"

type Props = {
  open: boolean
  closeHandler: Function
}

const CreateS3BucketFormDialog = (props:Props) => {
  const [bucketName, setBucketName] = useState('')
  const [error, setError] = useState('')
  const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case 'bucket-name':
        setError('')
        setBucketName(event.target.value);
        break;
      default:
        break
    }
  }
  const handleSubmit = async () => {
    const requestBody:S3Bucket = {
      Name: bucketName
    }
    const response = await fetch('/api/s3/new/bucket', {
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

  return (
    <Dialog open={props.open}>
      <DialogTitle>バケット作成</DialogTitle>
      <DialogContent>
        <input autoFocus name='bucket-name' onChange={handleChange} />
        <p>{error}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.closeHandler()}>キャンセル</Button>
        <Button color='primary' onClick={handleSubmit}>作成</Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateS3BucketFormDialog