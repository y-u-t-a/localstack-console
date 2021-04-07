import Link from 'next/link'
import { useEffect, useState } from 'react'

import Layout from '../../components/Layout'
import { S3Bucket } from '../../interfaces'

const S3Page = () => {
  const [s3Buckets, setS3Buckets] = useState<S3Bucket[]>([])
  const fetchS3Buckets = async () => {
    const response = await fetch('/api/s3')
    const body = await response.json()
    setS3Buckets(body)
  }
  useEffect(() => {
    fetchS3Buckets()
  }, [])
  return (
    <Layout title="S3 | AWS Mock">
      <h1>S3 バケット一覧</h1>
      <Link href='/s3/new'>
        <button>バケット作成</button>
      </Link>
      <button onClick={fetchS3Buckets}>再読み込み</button>
      <ul>
      {s3Buckets.map((s3Bucket) => (
        <li key={s3Bucket.Name}>
          <p>
            <Link href={{
              pathname: '/s3/[bucket]',
              query: { bucket: s3Bucket.Name}
            }}>
              <a>{s3Bucket.Name}</a>
            </Link>
            {" " + s3Bucket.CreationDate}
          </p>
        </li>
      ))}
      </ul>
    </Layout>
  )
}

export default S3Page