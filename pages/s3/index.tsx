import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button } from '@material-ui/core'

import Layout from '../../components/Layout'
import CreateS3BucketFormDialog from '../../components/s3/CreateS3BucketForm'
import { S3Bucket } from '../../interfaces/s3'

const S3Page = () => {
  const [s3Buckets, setS3Buckets] = useState<S3Bucket[]>([])
  const [openDialog, setOpenDialog] = useState(false)
  const openDialogForm = () => setOpenDialog(true)
  const closeDialogForm = () => {
    setOpenDialog(false)
    fetchS3Buckets() // 作成したバケットを表示するために再読み込みする
  }
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
      <Button variant="contained" onClick={openDialogForm}>バケット作成</Button>
      <CreateS3BucketFormDialog open={openDialog} closeHandler={closeDialogForm}/>
      {' '}
      <Button variant="contained" onClick={fetchS3Buckets}>再読み込み</Button>
      <ul>
      {s3Buckets.map((s3Bucket) => (
        <li key={s3Bucket.Name}>
          <p>
            <Link href={{
              pathname: '/s3/[bucket]',
              query: { bucket: s3Bucket.Name }
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