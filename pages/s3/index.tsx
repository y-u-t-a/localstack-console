import { useEffect, useState } from 'react'
import { Button } from '@material-ui/core'
import { GridRowId } from '@material-ui/data-grid'

import Layout from '../../components/Layout'
import CreateS3BucketFormDialog from '../../components/s3/CreateS3BucketForm'
import DeleteS3BucketFormDialog from '../../components/s3/DeleteS3BucketForm'
import S3BucketList from '../../components/s3/S3BucketList'
import { S3Bucket } from '../../interfaces/s3'

const S3Page = () => {
  const [s3Buckets, setS3Buckets] = useState<S3Bucket[]>([])
  // 「バケット作成」の state 管理
  const [openCreateBucketDialog, setOpenCreateBucketDialog] = useState(false)
  const openCreateBucketDialogForm = () => setOpenCreateBucketDialog(true)
  const closeCreateBucketDialogForm = () => {
    setOpenCreateBucketDialog(false)
    fetchS3Buckets() // 作成したバケットを表示するために再読み込みする
  }
  // 「バケット削除」の state 管理
  const [openDeleteBucketDialog, setDeleteBucketDialog] = useState(false)
  const openDeleteBucketDialogForm = () => setDeleteBucketDialog(true)
  const closeDeleteBucketDialogForm = () => {
    setDeleteBucketDialog(false)
    fetchS3Buckets()
  }
  // バケットリストを取得
  const fetchS3Buckets = async () => {
    const response = await fetch('/api/s3')
    const body = await response.json()
    setS3Buckets(body)
  }
  // チェックボックスの state 管理
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
      {openCreateBucketDialog &&
        <CreateS3BucketFormDialog // 「バケット作成」をクリックしたときに表示するダイアログ
          open={openCreateBucketDialog}
          closeHandler={closeCreateBucketDialogForm}
        />
      }
      {' '}
      <Button
        variant='contained'
        color='secondary'
        disabled={selectionBucket.length != 1} // チェックボックスが1つ選択されている時だけ有効
        onClick={openDeleteBucketDialogForm}
      >バケット削除</Button>
      {openDeleteBucketDialog &&
        <DeleteS3BucketFormDialog // 「バケット削除」をクリックしたときに表示するダイアログ
          open={openDeleteBucketDialog}
          closeHandler={closeDeleteBucketDialogForm}
          selectionS3Bucket={selectionBucket[0] as string}
        />
      }
      <S3BucketList
        s3Buckets={s3Buckets}
        selectHandler={setSelectionBucket}
      />
    </Layout>
  )
}

export default S3Page