import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  DialogTitle,
} from "@material-ui/core"
import { useState } from "react"

import { S3Bucket } from '../../interfaces/s3'

type Props = {
  open: boolean
  selectionS3Bucket: string
  closeHandler: Function
}

const DeleteS3BucketFormDialog = (props:Props) => {
  const [error, setError] = useState('')
  const handleSubmit = async () => {
    const reqestBody:S3Bucket = {
      Name: props.selectionS3Bucket
    }
    const response = await fetch('/api/s3', {
      'method': 'DELETE',
      'body': JSON.stringify(reqestBody)
    })
    if (response.ok) {
      // バケット削除後すぐにデータフェッチすると削除したバケットも取得してしまうので 500ms 待つ
      setTimeout(props.closeHandler, 500)
    } else {
      const responseBody = await response.json()
      setError(responseBody.message)
    }
  }

  return (
    <Dialog open={props.open}>
      <DialogTitle>バケット削除</DialogTitle>
      <DialogContent>
        以下のバケットを削除します
        <p>{props.selectionS3Bucket}</p>
        <p>{error}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.closeHandler()}>キャンセル</Button>
        <Button color='secondary' onClick={handleSubmit}>削除</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteS3BucketFormDialog