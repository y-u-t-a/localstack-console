import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  DialogTitle,
} from "@material-ui/core"

import { S3Bucket } from '../../interfaces/s3'

type Props = {
  open: boolean
  selectionS3Bucket: string
  closeHandler: Function
}

const DeleteS3BucketFormDialog = (props:Props) => {
  const handleSubmit = async () => {
    const reqestBody:S3Bucket = {
      Name: props.selectionS3Bucket
    }
    await fetch('/api/s3', {
      'method': 'DELETE',
      'body': JSON.stringify(reqestBody)
    })
    // バケット削除後すぐにデータフェッチすると削除したバケットも取得してしまうので 500ms 待つ
    setTimeout(props.closeHandler, 500)
  }

  return (
    <Dialog open={props.open}>
      <DialogTitle>バケット削除</DialogTitle>
      <DialogContent>
        以下のバケットを削除します
        <p>{props.selectionS3Bucket}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.closeHandler()}>キャンセル</Button>
        <Button color='secondary' onClick={handleSubmit}>削除</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteS3BucketFormDialog