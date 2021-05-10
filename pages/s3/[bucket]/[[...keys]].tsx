import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { S3Object } from '../../../interfaces/s3'
import Layout from '../../../components/Layout'
import S3ObjectDetail from '../../../components/s3/S3ObjectDetail'
import S3ObjectList from '../../../components/s3/S3ObjectList'

const S3ObjectPage = () => {
  const router = useRouter()
  const bucket = router.query.bucket as string
  const keys = router.query.keys as string[] || []
  // オブジェクト一覧の state 管理
  const [s3Objects, setS3Objects] = useState<S3Object[]>([])
  // オブジェクト詳細の state 管理
  const [s3Object, setS3Object] = useState<S3Object>()
  // 画面読み込みの state 管理
  const [loading, setLoading] = useState<boolean>(true)
  // データフェッチ関数
  const fetchS3ObjectDetail = async (bucket:string, key:string): Promise<S3Object | undefined> => {
    const response = await fetch(`/api/s3/detail/${bucket}/${key}`)
    if (response.ok) {
      return await response.json()
    } else {
      return undefined
    }
  }
  const fetchS3Objects = async (bucket:string, key:string): Promise<S3Object[]> => {
    const response = await fetch(`/api/s3/list/${bucket}/${key}`)
    if (response.ok) {
      return await response.json()
    } else {
      throw Error('存在しないバケットが指定された')
    }
  }
  const fetchData = async () => {
    if (router.isReady) {
      const bucket = router.query.bucket as string
      const keys = router.query.keys as string[] || []
      const objectDetail = await fetchS3ObjectDetail(bucket, keys.join('/'))
      if (objectDetail) {
        setS3Object(objectDetail)
      } else {
        try {
          const objectList = await fetchS3Objects(bucket, keys.join('/'))
          setS3Objects(objectList)
        } catch (error) {
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
    fetchData()
  }, [router.query]) // URL が変更されるたびに実行する

  return (
    <Layout title={`S3 - ${ bucket } | AWS Mock`}>
      <h1>バケット: { bucket }</h1>
      {!loading && !s3Object && // 苦し紛れだがオブジェクト詳細が取得できたか否かでリストを表示するか判断
        <S3ObjectList
          bucket={bucket}
          s3Objects={s3Objects}
          prefix={keys.join('/')}
          reloadHandler={fetchData}
        />
      }
      {!loading && s3Object &&
        <S3ObjectDetail s3Object={s3Object} />
      }
    </Layout>
  )
}

export default S3ObjectPage