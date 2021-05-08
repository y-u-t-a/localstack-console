import { useEffect, useState } from 'react'
import { S3Object } from '../../interfaces/s3'

type Props = {
  bucket: string,
  objectKey: string,
}

const S3ObjectDetail = (props:Props) => {
  const [s3Object, setS3Object] = useState<S3Object>()
  const fetchS3ObjectDetail = async () => {
    const response = await fetch(`/api/s3/detail/${props.bucket}/${props.objectKey}`)
    const body:S3Object = await response.json()
    setS3Object(body)
  }
  useEffect(() => {
    fetchS3ObjectDetail()
  }, [])
  return (
    <>
      <p>オブジェクト詳細</p>
      <p>ファイル名 : {s3Object?.Key}</p>
      <p>更新日時 : {s3Object?.LastModified}</p>
    </>
  )
}

export default S3ObjectDetail