import { useEffect, useState } from 'react'
import { S3ObjectDetail } from '../../interfaces/s3'

type Props = {
  bucket: string,
  objectKey: string,
}

const S3ObjectDetailComponent = (props:Props) => {
  const [s3ObjectDetail, setS3ObjectDetail] = useState<S3ObjectDetail>()
  const fetchS3ObjectDetail = async () => {
    const response = await fetch(`/api/s3/detail/${props.bucket}/${props.objectKey}`)
    const body:S3ObjectDetail = await response.json()
    setS3ObjectDetail(body)
  }
  useEffect(() => {
    fetchS3ObjectDetail()
  }, [])
  return (
    <>
      <p>オブジェクト詳細</p>
      <p>ファイル名 : {s3ObjectDetail?.Key}</p>
      <p>更新日時 : {s3ObjectDetail?.LastModified}</p>
    </>
  )
}

export default S3ObjectDetailComponent