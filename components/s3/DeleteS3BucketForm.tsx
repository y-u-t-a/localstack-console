import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  DialogTitle,
} from "@material-ui/core"
import { MouseEventHandler } from "react"

import { S3Bucket } from '../../interfaces/s3'

type Props = {
  open: boolean
  selectionS3Buckets: string[]
  closeHandler: MouseEventHandler
}

const DeleteS3BucketFormDialog = (props:Props) => {
  const handleSubmit = async (event:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const reqestBody:S3Bucket[] = props.selectionS3Buckets.map(selectionS3Bucket => {
      return {
        Name: selectionS3Bucket
      }
    })
    await fetch('/api/s3', {
      'method': 'DELETE',
      'body': JSON.stringify(reqestBody)
    })
    // バケット削除後すぐにデータフェッチすると削除したバケットも取得してしまうので 500ms 待つ
    setTimeout(props.closeHandler, 500, event)
  }

  return (
    <Dialog open={props.open}>
      <DialogTitle>バケット削除</DialogTitle>
      <DialogContent>
        以下のバケットを削除します
        <ul>
          {props.selectionS3Buckets.map(s3Bucket => (
            <li key={s3Bucket}>
              <p>{s3Bucket}</p>
            </li>
          ))}
        </ul>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.closeHandler}>キャンセル</Button>
        <Button color='secondary' onClick={(event) => handleSubmit(event)}>削除</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteS3BucketFormDialog