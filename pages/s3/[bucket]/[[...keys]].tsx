import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { S3Object } from '../../../interfaces/s3'
import Layout from '../../../components/Layout'
import S3ObjectDetail from '../../../components/s3/S3ObjectDetail'
import S3ObjectList from '../../../components/s3/S3ObjectList'

const S3ObjectPage = () => {
  const router = useRouter()
  const bucket = router.query.bucket as string
  const [s3Objects, setS3Objects] = useState<S3Object[]>([])
  const fetchS3Objects = async () => {
    if (router.isReady) {
      const bucket = router.query.bucket as string
      const keys = router.query.keys as string[] || []
      const response = await fetch(`/api/s3/list/${bucket}/${keys.join('/')}`)
      const body = await response.json()
      setS3Objects(body)
    }
  }
  useEffect(() => {
    fetchS3Objects()
  }, [router.query]) // URL が変更されるたびに実行する
  return (
    <Layout title={`S3 - ${ bucket } | AWS Mock`}>
      <h1>バケット: { bucket }</h1>
      {s3Objects.length != 1 &&
        <S3ObjectList bucket={bucket} s3Objects={s3Objects} />
      }
      {s3Objects.length == 1 &&
        <S3ObjectDetail bucket={bucket} />
      }
    </Layout>
  )
}

export default S3ObjectPage