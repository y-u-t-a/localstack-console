import { Button } from '@material-ui/core'

import { S3Object } from '../../interfaces/s3'

type Props = {
  s3Object: S3Object
}

const S3ObjectDetail = (props:Props) => {
  return (
    <>
      <Button
        variant="contained"
        href={`/api/s3/download/${props.s3Object.Bucket}/${props.s3Object.Key}`}
      >ダウンロード</Button>
      <p>オブジェクト詳細</p>
      <p>ファイル名 : {props.s3Object.Key}</p>
      <p>更新日時 : {props.s3Object.LastModified}</p>
    </>
  )
}

export default S3ObjectDetail