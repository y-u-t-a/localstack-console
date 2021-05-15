import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  DialogTitle,
} from "@material-ui/core"
import { useState } from "react"
import { useRouter } from 'next/router'

import { S3Object } from '../../interfaces/s3'

type Props = {
  open: boolean
  bucket: string
  selectionS3Objects: string[]
  closeHandler: Function
}

const DeleteS3ObjectFormDialog = (props:Props) => {
  const [error, setError] = useState('')
  const router = useRouter()
  const handleSubmit = async () => {
    const keys = router.query.keys as string[] || []
    console.log(keys);
    const reqestBody:S3Object[] = props.selectionS3Objects.map(objectName => {
      const key = keys.length === 0? '' : keys.join('/') + '/'
      return {
        Bucket: props.bucket,
        Key: key + objectName
      }
    })
    const response = await fetch('/api/s3/[bucket]/[...keys]', {
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
      <DialogTitle>オブジェクト削除</DialogTitle>
      <DialogContent>
        以下のオブジェクトを削除します<br/>
        <ul>
          {props.selectionS3Objects.map(s3Object =>
            <li key={s3Object}>{s3Object}</li>
          )}
        </ul>
        <p>{error}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.closeHandler()}>キャンセル</Button>
        <Button color='secondary' onClick={handleSubmit}>削除</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteS3ObjectFormDialog