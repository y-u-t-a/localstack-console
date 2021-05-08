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

  return (
    <Dialog open={props.open}>
      <DialogTitle>バケット作成</DialogTitle>
      <DialogContent>
        <input />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.closeHandler}>キャンセル</Button>
        <Button color='primary' onClick={props.closeHandler}>作成</Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateS3BucketFormDialog