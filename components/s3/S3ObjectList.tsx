import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@material-ui/core'
import {
  DataGrid,
  GridColumns,
  GridRowsProp,
  GridCellParams,
  GridRowId
} from '@material-ui/data-grid'

import CreateS3FolderForm from '../../components/s3/CreateS3FolderForm'
import { S3Object } from '../../interfaces/s3'

type Props = {
  bucket: string
  s3Objects: S3Object[]
  prefix: string
  reloadHandler: Function
}

const S3ObjectList = (props:Props) => {
  const [openDialog, setOpenDialog] = useState(false)
  const openDialogForm = () => setOpenDialog(true)
  const closeDialogForm = () => {
    setOpenDialog(false)
    props.reloadHandler()
  }
  const [selectionObject, setSelectionObject] = useState<GridRowId[]>([])
  const columns:GridColumns = [
    {
      field: 'id', // id という名前の列は必須
      headerName: 'オブジェクト',
      width: 250,
      type: 'string',
      renderCell: (params: GridCellParams) => { // オブジェクト名をリンクでレンダリングする
        const s3ObjectName = params.value as string
        return (
          <Link href={{
            pathname: '/s3/[bucket]/[[...keys]]',
            query: { bucket: props.bucket, keys: s3ObjectName.split('/') }
          }}>
            <a>{s3ObjectName}</a>
          </Link>
        )
      }
    },
    {
      field: 'size',
      headerName: 'サイズ',
      width: 100
    },
    {
      field: 'lastModified',
      headerName: '最終更新日時',
      width: 250
    },
  ]
  const rows:GridRowsProp = props.s3Objects.map(object => {
    return {
      id: object.DisplayObjectName,
      size: object.Size,
      lastModified: object.LastModified
    }
  })

  return (
    <>
      <Button variant="contained" onClick={openDialogForm}>フォルダ作成</Button>
      <CreateS3FolderForm
        open={openDialog}
        closeHandler={closeDialogForm}
        bucketName={props.bucket}
        prefix={props.prefix}
      />
      <div style={{ height: 550, width: '100%', marginTop: 10 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={50}
          checkboxSelection
          onSelectionModelChange={(newSelection) => {
            setSelectionObject(newSelection.selectionModel)
          }}
        />
      </div>
    </>
  )
}

export default S3ObjectList