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
  closeHandler: MouseEventHandler
}

const CreateS3BucketFormDialog = (props:Props) => {
  const createBucket = async (event:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log("バケット作成")
    props.closeHandler(event)
  }

  return (
    <Dialog open={props.open}>
      <DialogTitle>バケット作成</DialogTitle>
      <DialogContent>
        <input autoFocus />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.closeHandler}>キャンセル</Button>
        <Button color='primary' onClick={(event) => createBucket(event)}>作成</Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateS3BucketFormDialog