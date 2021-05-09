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
  const [s3Object, setS3Object] = useState<S3Object>()
  const [loading, setLoading] = useState<boolean>(true)
  const fetchS3Objects = async () => {
    if (router.isReady) {
      const bucket = router.query.bucket as string
      const keys = router.query.keys as string[] || []
      let response = await fetch(`/api/s3/detail/${bucket}/${keys.join('/')}`)
      if (response.ok) {
        setS3Object(await response.json())
      } else {
        response = await fetch(`/api/s3/list/${bucket}/${keys.join('/')}`)
        if (response.ok) {
          setS3Objects(await response.json())
        } else {
          // 存在しないバケットが指定された場合、S3 のトップページへ移動
          router.push('/s3')
        }
      }
      setLoading(false)
    }
  }
  useEffect(() => {
    setLoading(true)
    setS3Object(undefined)
    setS3Objects([])
    fetchS3Objects()
  }, [router.query]) // URL が変更されるたびに実行する

  return (
    <Layout title={`S3 - ${ bucket } | AWS Mock`}>
      <h1>バケット: { bucket }</h1>
      {!loading && !s3Object && // 苦し紛れだがオブジェクト詳細が取得できたか否かでリストを表示するか判断
        <S3ObjectList bucket={bucket} s3Objects={s3Objects} />
      }
      {!loading && s3Object &&
        <S3ObjectDetail s3Object={s3Object} />
      }
    </Layout>
  )
}

export default S3ObjectPage