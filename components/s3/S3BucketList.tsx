import Link from 'next/link'
import { DataGrid, GridColumns, GridRowsProp, GridCellParams } from '@material-ui/data-grid'

import { S3Bucket } from '../../interfaces/s3'

type Props = {
  s3Buckets: S3Bucket[]
}

const S3BucketList = (props:Props) => {
  const columns:GridColumns = [
    {
      field: 'id', // id という名前の列は必須
      headerName: 'バケット名',
      width: 250,
      type: 'string',
      renderCell: (params: GridCellParams) => { // バケット名をリンクでレンダリングする
        const bucketName = params.value as string
        return (
          <Link href={{
            pathname: '/s3/[bucket]',
            query: { bucket: bucketName }
          }}>
            <a>{bucketName}</a>
          </Link>
        )
      }
    },
    {
      field: 'bucketCreationDate',
      headerName: 'バケット作成日時',
      width: 250
    },
  ]
  const rows:GridRowsProp = props.s3Buckets.map(bucket => {
    return {
      id: bucket.Name,
      bucketCreationDate: bucket.CreationDate
    }
  })

  return (
    <div style={{ height: 550, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={50} checkboxSelection />
    </div>
  )
}

export default S3BucketList