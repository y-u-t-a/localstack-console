import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  DialogTitle,
} from "@material-ui/core"
import { MouseEventHandler } from "react"

type Props = {
  open: boolean
  selectionS3Buckets: string[]
  closeHandler: MouseEventHandler
}

const DeleteS3BucketFormDialog = (props:Props) => {
  const handleSubmit = async (event:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    
    props.closeHandler(event)
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