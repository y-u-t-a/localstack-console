import { useEffect, useState } from 'react'
import { Button } from '@material-ui/core'
import { GridRowId } from '@material-ui/data-grid'

import Layout from '../../components/Layout'
import CreateS3BucketFormDialog from '../../components/s3/CreateS3BucketForm'
import S3BucketList from '../../components/s3/S3BucketList'
import { S3Bucket } from '../../interfaces/s3'

const S3Page = () => {
  const [s3Buckets, setS3Buckets] = useState<S3Bucket[]>([])
  const [openCreateBucketDialog, setOpenCreateBucketDialog] = useState(false)
  const openCreateBucketDialogForm = () => setOpenCreateBucketDialog(true)
  const closeCreateBucketDialogForm = () => {
    setOpenCreateBucketDialog(false)
    fetchS3Buckets() // 作成したバケットを表示するために再読み込みする
  }
  const fetchS3Buckets = async () => {
    const response = await fetch('/api/s3')
    const body = await response.json()
    setS3Buckets(body)
  }
  const [selectionBucket, setSelectionBucket] = useState<GridRowId[]>([])
  useEffect(() => {
    fetchS3Buckets()
  }, [])

  return (
    <Layout title="S3 | AWS Mock">
      <h1>S3 バケット一覧</h1>
      <Button
        variant="contained"
        onClick={openCreateBucketDialogForm}
      >バケット作成</Button>
      <CreateS3BucketFormDialog
        open={openCreateBucketDialog}
        closeHandler={closeCreateBucketDialogForm}
      />
      {' '}
      <Button
        variant='contained'
        color='secondary'
        disabled={selectionBucket.length == 0} // チェックボックスが選択されている時だけ有効
      >バケット削除</Button>
      <S3BucketList
        s3Buckets={s3Buckets}
        selectHandler={setSelectionBucket}
      />
    </Layout>
  )
}

export default S3Page